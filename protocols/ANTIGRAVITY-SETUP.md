# Antigravity IDE Setup (CaptainSolo)

## 1. Open captainsoloHQ as a Project

Antigravity → New Project → Add folders:

- `C:\Users\Administrator\Projects\captainsoloHQ` (hub + rules)
- `C:\Users\Administrator\Projects\light-years-game` (when coding)
- `C:\Users\Administrator\Projects\priority-engine` (when coding)

Multi-folder = agent sees HQ rules + code together.

## 2. Rules (auto-loaded)

Antigravity reads markdown rules from:

```
.agent/rules/*.md
```

Already in this repo:

| Rule | Purpose |
|---|---|
| `learn-first-tutor.md` | No vibe code, quiz-first, slice-based |
| `captainsolo-comms.md` | Your tone, identity, constraints |

Open any rule file → Antigravity Rule Editor UI.

## 3. Workflows

| Workflow | When |
|---|---|
| `daily-captainsolo-flow.md` | Full day agent behavior |
| `learn-first-coding-session.md` | Build block only |

Master human flow: [FLOW.md](../protocols/FLOW.md)

## 4. Slash commands to use

| Command | When |
|---|---|
| `/grill-me` | Before any new slice or feature (agent asks aligning questions) |
| `/goal` | Only for chores (install deps, run build). **Not** for learning slices |

## 5. How to start a session (copy-paste)

```
Teach me Priority Engine Slice 1. Quiz me before the answer.
Follow .agent/rules/learn-first-tutor.md
```

or

```
Review my attempt at usePomodoro. I think the bug is stale closure.
Do not rewrite the whole file.
```

## 6. Cursor parity

Same repo includes `.cursor/rules/learn-first-tutor.mdc` for when you use Cursor on the same projects.

## 7. Global rules (optional)

Copy `learn-first-tutor.md` to a global Antigravity rules folder if Google exposes one in Settings → Rules. Project rules in `.agent/rules/` are enough for CaptainSolo work.
