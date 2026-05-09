# Development Roadmap — 3-hour polish sprint

Published site: https://amailab.github.io/rssu-technopark-projects/#/home

## Current status

The project is a frontend MVP for the RSSU Technopark operational dashboard:

- separate hash routes for Home, Resources, Projects, Grants, NTS;
- mobile-first navigation and card views;
- PWA manifest and app icons;
- animated identity asset and custom crab logo;
- Google Apps Script backend stub;
- Google Sheets schema documentation;
- project passports, resource workload, grant funnel/Gantt, NTS agenda/voting UI;
- AgentQueue concept for reliable OpenClaw/Telegram event delivery.

## 3-hour sprint goals

1. Make the UI feel more like a real working product, less like a static demo.
2. Improve mobile usability first: large touch targets, readable cards, compact navigation.
3. Prepare frontend structures for Google Sheets/App Script integration.
4. Keep every meaningful step buildable and deployed.

## Task queue

1. Roadmap and technical task list.
2. Data layer cleanup and API-readiness.
3. Cross-page chat / note capture flow.
4. NTS voting states and protocol-friendly decisions.
5. Resource allocation clarity.
6. Project passport quality and missing-data UX.
7. Grants/Gantt polish.
8. Mobile QA pass.
9. README/docs update.
10. Accessibility and keyboard/focus pass.
11. Final build/deploy/route check.
12. Final summary for Nikita.

## Backend handoff checklist

- Set `VITE_SHEETS_API_URL` to deployed Google Apps Script endpoint.
- Replace mock arrays in `src/main.jsx` with API-loaded data.
- Map action drawers to the correct event types and sheets.
- Persist chat notes into `ChatNotes` and `AgentQueue`.
- Persist votes into `Votes` and `VoteResponses`.
- Use `PassportQuality` to compute missing fields and completeness.

## Acceptance checks during sprint

- `npm run build` passes.
- GitHub Pages deploy succeeds.
- `/rssu-technopark-projects/#/home`, `#/projects`, `#/resources`, `#/grants`, `#/nts` load.
- Manifest/favicon/app icons return 200.
- Mobile UI remains readable at 360–430px width.

## Sprint checkpoint 1/12 — 2026-05-10 00:14 MSK

### Current audit

Main version is published and stable:

- GitHub Pages is enabled via Actions.
- Core routes exist: `#/home`, `#/resources`, `#/projects`, `#/grants`, `#/nts`.
- Mobile-first work completed: bottom navigation, mobile cards, larger touch targets.
- Branding completed: crab logo, favicon, app icons, PWA manifest.
- Grants Gantt chart was redesigned into a real timeline.

### Parallel alternative

Alternative version now exists separately:

- Repo: https://github.com/amAILab/rssu-technopark-projects-alt
- Site: https://amailab.github.io/rssu-technopark-projects-alt/
- It uses the imported `NTS Workspace` HTML concept, so it is meaningfully different from the main version.

### Next UX/code improvement for main version

Focus next on **data/API readiness**:

1. Extract mock data from `src/main.jsx` into a separate data module.
2. Add a small API adapter layer for future Google Apps Script reads/writes.
3. Keep current UI unchanged, but make backend connection easier.

### Notes from async commands

- Step3D Gmail lead check failed because `google-workspace` MCP timed out/offline. This is not “no leads”; it means the check could not access Gmail.
- Alternative site deploy succeeded via GitHub Pages workflow.
