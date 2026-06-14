# CaptainSolo Flow

One operating system. Human blocks first, AI accompanies learn-first coding second.

## Overview

```
WAKE → BODY → MIND (math/french) → BUILD (learn-first) → MONEY (job) → REWARD (aim) → CLOSE
```

Tools per block:

| Block | Tool |
|---|---|
| Schedule | Priority Engine (when you finish it) or Obsidian daily note |
| Body | FITNESS-SETUP + NEURO-CALIBRATION |
| Mind | Obsidian + tablet + books |
| Build | Antigravity + `.agent/rules/` |
| Close | Obsidian daily note + Learning Log |

---

## Phase 0: Night Before (2 min)

In Obsidian `vault/Daily/TOMORROW.md` or bottom of today's note:

1. Name **tomorrow's first move** (one concrete action)
2. Name **build slice** (e.g. "Priority Engine Slice 2" or "Light Years Raylib port step 1")
3. Check: no new downloads, no new side quests

---

## Phase 1: Wake (0-25 min)

**Goal:** nervous system online before screens.

1. Feet down. No phone.
2. Neuro block (../protocols/NEURO-CALIBRATION.md):
   - Max effort sprints
   - Barefoot dead-weight juggle (bed behind you)
   - Pull-ups + parallette dips (../protocols/FITNESS-SETUP.md)
3. Optional: 5 min Aimbeast target switching

**Gate:** if you skip this, you still do 10 min minimum cali before math. No zero days.

---

## Phase 2: Mind (65-85 min)

**Goal:** rebuild cognition + French revenue path.

### Math (45-60 min)

1. McMullen drills 20-30 min
2. Kelley/Stewart: attempt on tablet → check → re-attempt blind
3. Stall point = note in Obsidian

### French (20 min)

1. Vocabulaire Progressif: one unit, handwritten
2. Log words in `vault/French/Word Bank.md`

---

## Phase 3: Build (2 hr, learn-first)

**Goal:** one slice, you type it, you own it.

### Pick track (weekly rotation)

| Day | Track | Doc |
|---|---|---|
| Mon | Light Years | LIGHTYEARS-ROADMAP.md |
| Tue | Priority Engine | PRIORITY-ENGINE-LEARNING-PATH.md |
| Wed | Light Years | LIGHTYEARS-ROADMAP.md |
| Thu | StudyOS or Priority Engine | STUDYOS-ROADMAP.md |
| Fri | Light Years or review | catch-up / checklist |

### Antigravity session flow (copy this order)

**1. Open project** (captainsoloHQ + active code folder)

**2. Paste to agent:**
```
/grill-me
Today's slice: [name from learning path].
Follow .agent/workflows/learn-first-coding-session.md
```

**3. Predict (you, tablet or chat):**
- What should this code do?
- Draw state diagram if timers/state involved

**4. Implement (you type, ~30 lines max)**

**5. Paste to agent:**
```
Review my attempt. Do not rewrite the whole file.
Quiz me on 2 edge cases.
```

**6. Close build block:**
- Run CODE-REVIEW-CHECKLIST.md (you check boxes, report misses)
- Learning Log entry in `vault/Code/Learning Log.md`
- 60 sec closed-book explain aloud

**Chores only** (npm install, cmake build): `/goal` allowed. Learning slices: never.

---

## Phase 4: Money (1 hr)

1. JobScanner-Pro or 3-5 tailored applications (../tracks/JOB-PIPELINE.md)
2. Log in Obsidian: company / role / date / follow-up
3. Friday extra: scan federal bid opportunities (FRENCH-TRACK.md, post-B2)

---

## Phase 5: Reward (optional, intentional)

Named intention only (../protocols/MEDIA-PROTOCOL.md):

- Aimbeast drill tied to 120→28cm map, OR
- One ranked session with a stated goal, OR
- Zen: music + thoughts, no feed

---

## Phase 6: Close (5 min)

1. Complete the Obsidian daily note:
   ```markdown
   ## Body: done? Y/N
   ## Math: chapter/drill
   ## French: unit
   ## Build: slice + closed-book Y/N
   ## Job: what sent
   ## Tomorrow's first move: ONE line
   ```
2. Commit your day using the audit script:
   Run `.\scripts\audit-commit.ps1` in the terminal to save your progress, log your daily focus level, and keep your git history active.

---

## Weekly Flow (Sunday, 20 min)

1. BETTER-ALTERNATIVES-MASTER-PLAN: which paths did I run vs basic?
2. SAT checkpoint if biweekly (Math/SAT Checkpoint Tracker)
3. README Status update
4. Pick next week's build slices (write Mon-Fri in Obsidian)
5. Media audit (../protocols/MEDIA-PROTOCOL.md)

---

## Decision Tree (when stuck)

| Situation | Move |
|---|---|
| Lazy, low energy | 10 min cali + 1 math page + close. No guilt. |
| Agent dumped full app | Stop. Say: "Slice only. Quiz me first." |
| Bug you do not understand | Explain what you expected vs got. Agent hints, you fix. |
| Tempted to download new book | No. LIBRARY-CATALOG anti-hoard rule. |
| Tempted to vibe code new app | Priority Engine first. Schedule in blocks, then build. |
| Comp itch mid-morning | Not before Phase 3 minimum. Reward block exists for a reason. |

---

## First Week Starter (if overwhelmed)

| Day | Build slice |
|---|---|
| Mon | Light Years: run exe, read Application.cpp, explain loop on paper |
| Tue | Priority Engine Slice 1 (types + quadrant function) |
| Wed | Light Years: draw entity diagram for Phase 2 |
| Thu | Priority Engine Slice 2 (task state + localStorage) |
| Fri | Checklist pass on whatever you wrote + Learning Log review |

---

## Prompts Cheat Sheet

**Start slice:**
```
Teach me [Slice N]. Quiz me before the answer.
```

**Stuck:**
```
I predicted X but got Y. Here's my code. What concept am I missing?
```

**End session:**
```
Grade my closed-book explanation. What would a tech lead poke holes in?
```
