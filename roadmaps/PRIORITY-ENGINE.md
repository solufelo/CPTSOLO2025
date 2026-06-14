# Priority Engine

Eisenhower matrix + Pomodoro + time blocking in one app. The execution OS for the entire CaptainSolo stack.

**Problem it solves:** Master plan without time assignment = drift. This forces urgency into calendar slots.

## Core Features (MVP → v1)

| Feature | What it does |
|---|---|
| Eisenhower matrix | Drag tasks into Do / Schedule / Delegate / Delete |
| Urgency sort | Auto-rank by deadline + importance score |
| Pomodoro | 25/5 (customizable) tied to active task |
| Time blocks | Day view: assign tasks to hour slots, blocks overlap warning |
| Protocol presets | One-click load today's blocks from DAILY-PROTOCOL.md |

## Stack

| Layer | Choice | Why |
|---|---|---|
| MVP | React + TypeScript + Vite | Fast scaffold, runs today, local-first |
| Storage | localStorage → SQLite later | No backend needed for solo use |
| v1 deploy | Static host or embed in StudyOS | Case study fodder |
| Better alt | Blazor Hybrid shell | Same app, full C# stack for agency narrative |

## Repo

`C:\Users\Administrator\Projects\priority-engine`

## Daily Protocol Integration

Morning: open app → review matrix → time-block the 4.5hr stack → run Pomodoros per block.

Default block template (editable):

| Block | Duration | Pomodoros |
|---|---|---|
| Neuro + cali | 25 min | 1 |
| Math | 50 min | 2 |
| French | 25 min | 1 |
| Build (WASM/StudyOS) | 100 min | 4 |
| Job/agency | 50 min | 2 |

## Learning path (you build it)

Partial reference files exist. **Do not treat as finished.**

Follow [PRIORITY-ENGINE-LEARNING-PATH.md](../roadmaps/PRIORITY-ENGINE-LEARNING-PATH.md) slice by slice.

## Phases

| Phase | Deliverable |
|---|---|
| 1 | You implement types + task state (Slice 1-2) |
| 2 | You implement matrix + Pomodoro FSM (Slice 3-4) |
| 3 | Time blocks + protocol preset (Slice 5-6) |
| 4 | Checklist pass + closed-book explain (Slice 7) |
| 5 | PWA / StudyOS embed (only after you own the code) |

## Position in Master Plan

Sits **above** all tracks in BETTER-ALTERNATIVES-MASTER-PLAN.md. You do not "do French" or "do WASM" without a block on the calendar first.
