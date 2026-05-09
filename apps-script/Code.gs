const SPREADSHEET_ID = 'PUT_SPREADSHEET_ID_HERE';
const AGENT_WEBHOOK_URL = ''; // optional

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  appendRequest_(ss, payload);
  enqueueAgentEvent_(ss, 'request.created', payload);
  tryNotifyAgent_(payload);
  return json_({ ok: true });
}

function doGet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return json_({ ok: true, projects: readSheet_(ss, 'Projects'), grants: readSheet_(ss, 'Grants') });
}

function appendRequest_(ss, payload) {
  const sh = getOrCreate_(ss, 'Requests');
  if (sh.getLastRow() === 0) sh.appendRow(['id','created_at','name','category','email','telegram','type','project','lab','hours','competencies','role','materials_url','nts_required','text','status']);
  sh.appendRow([Utilities.getUuid(), new Date(), payload.name, payload.category, payload.email, payload.telegram, payload.type, payload.project, payload.lab, payload.hours, payload.competencies, payload.role, payload.materialsUrl, payload.nts, payload.text, 'new']);
}

function enqueueAgentEvent_(ss, type, payload) {
  const sh = getOrCreate_(ss, 'AgentQueue');
  if (sh.getLastRow() === 0) sh.appendRow(['id','created_at','event_type','payload_json','status','attempts','last_error','processed_at']);
  sh.appendRow([Utilities.getUuid(), new Date(), type, JSON.stringify(payload), 'pending', 0, '', '']);
}

function tryNotifyAgent_(payload) {
  if (!AGENT_WEBHOOK_URL) return;
  UrlFetchApp.fetch(AGENT_WEBHOOK_URL, { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true });
}

function readSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const rows = sh.getDataRange().getValues();
  const headers = rows.shift() || [];
  return rows.map(r => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
}

function getOrCreate_(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
