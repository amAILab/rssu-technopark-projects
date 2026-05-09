import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BarChart3, Bot, CalendarCheck, CheckCircle2, ClipboardList, FolderKanban, Handshake, Home, MessageSquare, QrCode, Users} from 'lucide-react';
import './styles.css';

const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL || '';
const BOT_URL = import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/STEP_3D_Lab';

const projects = [
  {id: 1, title: 'Лаборатория 3D-печати', status: 'active', nts: false, hours: 42, lab: 'Аддитивные технологии'},
  {id: 2, title: 'Робототехнический практикум', status: 'active', nts: true, hours: 18, lab: 'Робототехника'},
  {id: 3, title: 'Социальный дизайн изделий', status: 'paused', nts: true, hours: 10, lab: 'Промдизайн'},
  {id: 4, title: 'Грантовая заявка: инженерные классы', status: 'grant', nts: false, hours: 24, lab: 'Образование'},
];

const grants = [
  {name: 'Инженерные классы', stage: 'подготовка', deadline: 'май 2026', owner: 'Технопарк'},
  {name: 'Молодёжные инициативы', stage: 'поиск партнёров', deadline: 'июнь 2026', owner: 'НТС'},
];

const nav = [
  ['home', 'Главная', Home], ['resources', 'Ресурсы', Users], ['grants', 'Гранты', Handshake], ['projects', 'Проекты', FolderKanban], ['nts', 'НТС', ClipboardList]
];

function Stat({label, value, hint}) {return <div className="stat"><b>{value}</b><span>{label}</span><small>{hint}</small></div>}

function App(){
  const [page,setPage]=useState('home');
  const [form,setForm]=useState({name:'',category:'студенты',email:'',telegram:'',type:'вопрос по проекту',text:'',project:'',hours:'',competencies:'',nts:false});
  const stats=useMemo(()=>({total:projects.length, active:projects.filter(p=>p.status==='active').length, nts:projects.filter(p=>p.nts).length, hours:projects.reduce((s,p)=>s+p.hours,0)}),[]);
  async function submit(e){
    e.preventDefault();
    const payload={...form, createdAt:new Date().toISOString(), source:'site'};
    if(!SHEETS_API_URL){ alert('MVP: данные подготовлены. Укажите VITE_SHEETS_API_URL для отправки в Google Apps Script.'); console.log(payload); return; }
    const res=await fetch(SHEETS_API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    alert(res.ok?'Отправлено в Google Таблицу':'Не удалось отправить. Событие нужно сохранить локально/повторить.');
  }
  return <div><header><div className="brand">Технопарк РГСУ</div><nav>{nav.map(([id,label,Icon])=><button className={page===id?'active':''} onClick={()=>setPage(id)} key={id}><Icon size={18}/>{label}</button>)}</nav></header>
    <main>
      {page==='home'&&<><section className="hero"><div><p className="eyebrow">Операционный экран НТС</p><h1>Проекты Технопарка РГСУ</h1><p>Единый интерфейс для статуса проектов, ресурсов, грантов, вопросов, голосований и фиксации решений.</p><div className="actions"><a href={BOT_URL}>Открыть Telegram-бота</a><button onClick={()=>setPage('nts')}>Ближайший НТС</button></div></div><div className="qr"><QrCode size={96}/><span>QR для голосования / формы</span></div></section><section className="grid stats"><Stat label="Всего проектов" value={stats.total} hint="в базе"/><Stat label="Активные проекты" value={stats.active} hint="в работе"/><Stat label="Требуют решения НТС" value={stats.nts} hint="открытые вопросы"/><Stat label="Человеко-часов" value={stats.hours} hint="доступно на неделе"/></section><IntakeForm form={form} setForm={setForm} submit={submit}/></>}
      {page==='resources'&&<Page title="Ресурсы" icon={Users}><section className="grid stats"><Stat label="Доступно часов" value={stats.hours}/><Stat label="Лабораторий" value="4"/><Stat label="Волонтёров" value="12"/><Stat label="Экспертов" value="6"/></section><p>Здесь планируется учёт компетенций, доступности на неделю, ролей и загрузки участников.</p></Page>}
      {page==='grants'&&<Page title="Гранты" icon={Handshake}><Cards items={grants.map(g=>({title:g.name, meta:`${g.stage} · дедлайн: ${g.deadline}`, text:`Ответственный: ${g.owner}`}))}/></Page>}
      {page==='projects'&&<Page title="Проекты" icon={FolderKanban}><Cards items={projects.map(p=>({title:p.title, meta:`${p.lab} · ${p.status}`, text:`Доступно ${p.hours} ч/нед. ${p.nts?'Нужен НТС':'Без решения НТС'}`}))}/></Page>}
      {page==='nts'&&<Page title="НТС" icon={CalendarCheck}><section className="panel"><h2>Повестка ближайшего НТС</h2><ol><li>Проекты с открытыми вопросами</li><li>Распределение человеко-часов</li><li>Грантовые заявки</li><li>Голосование и фиксация решений</li></ol></section><section className="panel"><h2>Решения</h2><p>Решения сохраняются в Google Sheets и попадают в AgentQueue для Telegram/OpenClaw агента.</p></section></Page>}
    </main><footer><MessageSquare size={18}/><input placeholder="Сквозной чат: вопрос, решение, поручение..."/><button><Bot size={18}/>Отправить агенту</button></footer></div>
}
function Page({title,icon:Icon,children}){return <><section className="pageTitle"><Icon/><h1>{title}</h1></section>{children}</>}
function Cards({items}){return <section className="cards">{items.map((i,idx)=><article className="card" key={idx}><h3>{i.title}</h3><p className="meta">{i.meta}</p><p>{i.text}</p></article>)}</section>}
function IntakeForm({form,setForm,submit}){const upd=e=>setForm({...form,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value});return <section className="panel"><h2>Общая форма подачи информации</h2><form onSubmit={submit} className="form"><input name="name" value={form.name} onChange={upd} placeholder="ФИО / имя" required/><select name="category" value={form.category} onChange={upd}><option>технопарковцы</option><option>студенты</option><option>сотрудники университета</option><option>партнёры</option><option>волонтёры</option><option>внешние эксперты</option></select><input name="email" value={form.email} onChange={upd} placeholder="e-mail" required/><input name="telegram" value={form.telegram} onChange={upd} placeholder="Telegram-ник" required/><select name="type" value={form.type} onChange={upd}><option>вопрос по проекту</option><option>пожелание или предложение</option><option>регистрация себя как ресурса</option><option>указание доступного времени на неделю</option><option>предложение вопроса для обсуждения на НТС</option><option>предложение участия в проекте</option><option>иное обращение</option></select><input name="project" value={form.project} onChange={upd} placeholder="Проект / лаборатория"/><input name="hours" value={form.hours} onChange={upd} placeholder="Доступные часы на неделе"/><input name="competencies" value={form.competencies} onChange={upd} placeholder="Компетенции / желаемая роль"/><textarea name="text" value={form.text} onChange={upd} placeholder="Текст обращения" required/><label className="check"><input type="checkbox" name="nts" checked={form.nts} onChange={upd}/> Вынести вопрос на НТС</label><button type="submit"><CheckCircle2 size={18}/>Отправить</button></form></section>}
createRoot(document.getElementById('root')).render(<App/>);
