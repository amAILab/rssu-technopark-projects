# Google Sheets schema

## Sheets

### Projects
`id, title, lab, status, owner, priority, nts_required, open_questions, hours_needed, hours_available, updated_at`

### Resources
`id, name, category, email, telegram, competencies, available_hours_week, availability_text, preferred_role, updated_at`

### Requests
`id, created_at, name, category, email, telegram, type, project, lab, hours, competencies, role, materials_url, nts_required, text, status`

### NTSAgenda
`id, meeting_date, item_title, project_id, proposer, status, decision_id, created_at`

### Decisions
`id, meeting_date, project_id, decision_text, responsible, deadline, votes_for, votes_against, abstained, created_at`

### Grants
`id, title, stage, deadline, owner, amount, partner, status, notes, updated_at`

### AgentQueue
`id, created_at, event_type, payload_json, status, attempts, last_error, processed_at`
