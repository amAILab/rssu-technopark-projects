# Google Sheets schema

## Projects
`id, title, lab, status, owner, priority, goal, tasks, description, team, partners, dates, issues, nts_required, grant_linked, passport_percent, drive_url, updated_at`

## Resources
`id, name, category, email, telegram, competencies, lab, available_hours_week, busy_hours_week, free_hours_week, projects, comment, status, updated_at`

## Assignments
`id, week, person_id, person_name, project_id, project_title, role, task, assigned_hours, created_at, updated_at`

## Requests
`id, created_at, name, category, email, telegram, type, project, lab, hours, competencies, role, materials_url, nts_required, text, status`

## NTSAgenda
`id, meeting_date, item_title, project_id, proposer, status, decision_id, created_at`

## Decisions
`id, meeting_date, project_id, grant_id, decision_text, responsible, deadline, votes_for, votes_against, abstained, created_at`

## Grants
`id, title, fund, program, amount, deadline, stage, owner, related_projects, status, docs_url, description, required_materials, documents_list, key_dates_json, updated_at`

## GrantFunnel
`stage, count, updated_at`

## ProjectUpdates
`id, project_id, created_at, author, update_text, changed_fields_json`

## AgentQueue
`id, created_at, event_type, payload_json, status, attempts, last_error, processed_at`

## NTSMeetings
`meeting_id, number, date, title, status, protocol_url, created_at, updated_at`

## Votes
`vote_id, meeting_id, agenda_id, question, type, status, qr_url, created_at, closed_at`

## VoteResults
`result_id, vote_id, participant_id, participant_name, choice, comment, created_at`

## ChatMessages
`message_id, created_at, page, user_name, text, project_id, grant_id, agenda_id, agent_status, processed_at`

## ProtocolDraft
`draft_id, meeting_id, section, source_type, source_id, text, status, created_at`

## PassportQuality
`project_id, completeness, status, missing_drive_url, missing_responsible, missing_nearest_dates, missing_description, updated_at`
