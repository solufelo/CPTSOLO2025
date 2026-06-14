# Priority Engine — Learning Path (You Build It)

Eisenhower + Pomodoro + time blocks. Scaffold files exist as **reference only**. You re-type or rewrite each slice.

Repo: `C:\Users\Administrator\Projects\priority-engine` (partial)

## Slice 1: Types and mental model (30 min)

**Learn:** Eisenhower is just two booleans → four quadrants.

Tasks on tablet:
1. Draw the 2x2 matrix and label axes (urgent / important)
2. Write `Task` interface yourself in `src/types/task.ts`
3. Write `quadrantFromFlags(urgent, important)` without peeking

**Quiz yourself:** urgent=false, important=true → which quadrant?

## Slice 2: Task state (45 min)

**Learn:** React state + localStorage persistence.

You implement:
- `loadTasks` / `saveTasks`
- `addTask`, `toggleDone`, `moveTask`
- `urgencyScore` sort function

**Mistake to spot:** saving on every render vs only when tasks change.

## Slice 3: Eisenhower UI (45 min)

**Learn:** Controlled components, list rendering.

You implement `EisenhowerMatrix.tsx`:
- Map quadrants to grid
- Checkbox + quadrant dropdown per task

**Mistake to spot:** mutating task array in place instead of new array.

## Slice 4: Pomodoro state machine (60 min)

**Learn:** Timer as explicit phases: idle → work → break → idle.

Draw state diagram on paper first.

You implement `usePomodoro.ts`:
- `startWork(taskId)`, `stop()`
- Interval cleanup on unmount

**Mistakes to spot:**
- Stale closure in setInterval
- Forgetting clearInterval
- Break starting twice when seconds hit 0

## Slice 5: Time blocks (45 min)

**Learn:** String time math or minutes-since-midnight integers (pick one, defend choice).

You implement `TimeBlockDay.tsx` timeline view.

**Mistake to spot:** overlapping blocks not validated.

## Slice 6: Wire App + daily protocol preset (30 min)

**Learn:** Composition. One `loadProtocol()` seeds CaptainSolo daily blocks.

You wire `App.tsx` layout yourself.

## Slice 7: Polish + checklist

Run CODE-REVIEW-CHECKLIST.md. Write Learning Log entry.

## When to ask AI

- "I predicted X but got Y. What did I miss?" (paste your code only)
- "Quiz me on useEffect deps for this hook"
- Not: "build the whole app"

## Done criteria

You can demo the app AND explain every file closed-book for 5 minutes.
