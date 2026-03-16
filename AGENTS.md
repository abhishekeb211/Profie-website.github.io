# Agent context for this project

This project uses **Agentic AI Orchestrator** protocols. Always-on rules are in [.cursor/rules/](.cursor/rules/). For the full protocol (goal contracts, task DAGs, risk matrix, verification gates), use the **agentic-orchestrator** skill.

## After each successive plan implementation

Once a plan phase (or full plan) is implemented and verified:

1. **Update and push to git** — Commit all changes and push to the existing remote (e.g. `main`), or  
2. **Create a new GitHub repo and push there** — If the intent is to ship this as a new project, create the repo (via GitHub UI or API) and push this codebase to it.

Do not leave implemented work uncommitted; persist state by either pushing to the current repo or to a new one.
