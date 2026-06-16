# Learn-First Protocol

No vibe coding. NEVER ALLOW VIBE CODING. IT REINFORCES DOOMING. You build knowledge, not just repos.

**Rule:** If you cannot explain a line without looking, you do not own it yet.

## How AI Sessions Work From Now On

| Old mode (banned) | New mode (default) |
|---|---|
| Agent scaffolds entire app | Agent explains concept, you type the code |
| Copy-paste and run | Read every diff, predict before accepting |
| "It works" = done | "I can explain why" = done |
| Fix errors for you silently | Agent asks what you think broke first |
| Mass file dumps | One slice per session (max ~30 lines you write) |

**Agent prompt to use:** "Teach me slice X. Quiz me before giving the answer."

**Antigravity IDE:** rules live in `.agent/rules/`. See [ANTIGRAVITY-SETUP.md](../protocols/ANTIGRAVITY-SETUP.md). Use `/grill-me` before new slices.

## The Build Loop (every coding session)

1. **Predict** — what should this function do? Write pseudocode on tablet first
2. **Implement** — you type. Agent reviews, does not replace wholesale
3. **Explain** — Feynman note: why this approach, what alternatives exist
4. **Break** — agent gives 2 "what if" edge cases; you trace the code by hand
5. **Review** — run CODE-REVIEW-CHECKLIST.md on your own diff before commit

## Attention to Detail Drills

Do these until automatic:

- Read compiler warnings. Zero warnings policy on portfolio projects
- Trace types: what is every variable at runtime?
- Name audit: does every function name say what it does?
- Off-by-one: loops, array indices, timer seconds
- Null/empty: what happens with zero tasks, empty string, first load?
- State bugs: draw the state machine on paper (Pomodoro phases, game loop)
- Memory (C/C++): who owns this pointer? who frees it?

## Mistake-Spotting Practice

Weekly: open an old file cold. Find 3 things you would change without running the app.

Monthly: read someone else's small open-source file (Raylib example, React hook). Find 1 bug or smell.

## Project Learning Order (optimal, knowledge-first)

| Order | Project | What you actually learn |
|---|---|---|
| 1 | Light Years Phase 2 | C++ ownership, game loop, why fixed timestep |
| 2 | Priority Engine (you finish it) | React state, timers, localStorage, UI state machines |
| 3 | WASM pivot | Emscripten, linking, what breaks in browser vs native |
| 4 | StudyOS API slice | HTTP, auth, one endpoint you can defend in interview |
| 5 | Godot aim trainer OR open engine docs | Only after 1-2 are explainable |

Do not skip order to chase impressiveness.

## Priority Engine Status

Partial scaffold exists at `priority-engine/`. **You** finish it using guided slices.

See [PRIORITY-ENGINE-LEARNING-PATH.md](../roadmaps/PRIORITY-ENGINE-LEARNING-PATH.md). Do not run npm install and ship until you built each file yourself.

## Session Log (Obsidian)

Create `vault/Code/Learning Log.md`. Per session:

```
## Date / Project / Slice
- What I predicted:
- What I typed:
- What surprised me:
- Bug I caught (or missed):
- Can I explain it closed-book? Y/N
```

## Math + Code Same Brain

Math attempt-first (REDEMPTION-ARC) and code predict-first are the same skill: **retrieve before reveal**.

That is how you stop being a cog.
