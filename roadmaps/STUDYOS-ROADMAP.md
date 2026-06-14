# StudyOS — CaptainSolo Agency Case Study

**S-Tier:** Rebuild StudyOS with ASP.NET Core backend. Package the full project as an official **CaptainSolo Creative Agency** case study proving end-to-end product ownership.

**Better alternative:** Blazor Hybrid frontend instead of React. Entire stack stays C# for raw performance, still deploys everywhere (web + desktop).

## What This Proves to Clients

- Requirements → architecture → backend → UI → deploy → document
- You own the product, not just a feature slice
- Agency can point recruiters and clients at a real shipped system

## Stack (S-Tier)

| Layer | Tech |
|---|---|
| Backend | ASP.NET Core Web API |
| Auth | ASP.NET Identity or JWT |
| Data | EF Core + PostgreSQL or SQLite for demo |
| Frontend | React (current path) OR Blazor Hybrid (upgrade path) |
| Deploy | Azure / Railway / Docker |
| Case study | PDF + live demo URL on captainsolo site |

## Stack (Better Alternative — Blazor Hybrid)

| Layer | Tech |
|---|---|
| Backend | ASP.NET Core |
| Frontend | Blazor Hybrid (MAUI or WPF shell) |
| Win | One language, one debugger, no JS bundle tax |

## Phases

| Phase | Deliverable | Agency milestone |
|---|---|---|
| 1 | Repo scaffold, API skeleton, CI | "We structure projects professionally" |
| 2 | Core domain models + CRUD (StudyOS features) | Backend competence |
| 3 | Frontend wired to API | Full-stack proof |
| 4 | Auth, roles, polish | Production-shaped |
| 5 | Deploy live + write case study doc | **Ship to CaptainSolo portfolio** |

## Case Study Doc Template (Phase 5)

1. Problem statement (what StudyOS solves)
2. Architecture diagram
3. Tech choices and tradeoffs (why ASP.NET Core)
4. Screenshots + live link
5. Metrics (build time, test coverage if any, deploy pipeline)
6. What you'd do differently v2

## Cross-links

- WASM shooter = "I do low-level C too"
- StudyOS = "I ship full products for clients"
- Together = dangerous junior hire narrative
