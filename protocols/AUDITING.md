# Auditing & Emotional Expression Protocol

The goal of this protocol is to scaffold your daily execution and internal dialogue, allowing you to debug your day the same way you debug code.

## The Philosophy

ADHD and OCD brains are highly sensitive to emotional friction. An unmanaged internal dialogue creates anxiety, leading to task avoidance and dopamine-seeking behavior (alt-tabbing to games, feeds, or wiki rabbit holes).
- **Audit as Data, Not Judgement:** We do not punish failures. We log them as system behaviors to be understood and refactored.
- **Micro over Macro:** If the day is slipping, look at the immediate next 5 minutes, not the whole week.
- **Graceful Expression:** Repressing anxiety or frustration spikes cognitive latency. We write it down to release its hold, then view it from a wider perspective.

---

## 1. Spotting the Junction Points

A "Junction Point" is the exact microsecond you feel the urge to deviate from your planned block (e.g., getting stuck on a math problem and instantly wanting to open YouTube or Valorant).

When you hit a Junction Point:
1. **Pause (5 seconds):** Name the impulse ("I want to escape this math problem because it makes me feel dumb right now").
2. **Commit or Pivot:**
   - **Commit Option:** Run a 5-minute timer to stay in the problem. If still stuck, log the "Stall Point" honestly.
   - **Pivot Option:** Pivot to a lower-friction protocol task (e.g., 10 min calisthenics, clearing one email) instead of a dopamine loop.
3. **Audit:** Record these moments in your Daily Note under **Critical Junctions**.

---

## 2. Reframing the Internal Dialogue

When internal dialogue becomes overwhelming (e.g., collections debt, readmission probation anxiety), process it through three columns in your head or your daily note:

| The Raw Voice | The Bigger Picture | The Other Perspective |
|---|---|---|
| "I'm CA$3,480 in debt, my course registration is blocked, and I'm falling behind." | "This debt is a finite number. It is CA$3,483.03. I have a clear pipeline (JobScanner-Pro, French B2, federal contracts) to clear it. It does not define my intelligence." | "To collections/the university, this is a standard administrative account. They want a payment arrangement, not my failure. Establishing a CA$100/mo plan halts progression." |
| "I'm vibe coding or doing productivity cosplay. I haven't shipped anything real." | "I am learning Raylib, WASM, and low-level concepts first. This foundation prevents building fragile systems later. Consistently shipping 30-line slices is real progress." | "An employer wants to see that I understand what I write, not that I can prompt an AI to spit out a codebase I can't debug." |

---

## 3. The Daily Commit Loop

At the end of Phase 6 (Close the Day):
1. Complete your Daily Note.
2. Run the audit script in your terminal:
   ```powershell
   ./scripts/audit-commit.ps1
   ```
3. Enter your Daily Focus/Mood Tag when prompted.
4. Let the git diffs capture what you actually changed. If you didn't write any code or notes, the git tree will tell the truth.
