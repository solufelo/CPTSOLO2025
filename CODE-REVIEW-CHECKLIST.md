# Code Review Checklist

Run this on your own code before every commit. Attention to detail is a habit, not a vibe.

## Correctness

- [ ] Does it compile with zero warnings?
- [ ] Did I test the happy path manually?
- [ ] Did I test empty input / zero items / first-run?
- [ ] Off-by-one in loops, timers, array indices?
- [ ] Race conditions or stale state (React closures, async)?

## Readability

- [ ] Can I explain every function in one sentence?
- [ ] Names match behavior (no `data`, `temp`, `handleStuff`)?
- [ ] File has one clear job?

## C / C++ Extra

- [ ] Who owns each allocation?
- [ ] RAII or explicit free path for every `new`?
- [ ] Const correctness where possible?
- [ ] No undefined behavior (signed overflow, dangling refs)?

## TypeScript / React Extra

- [ ] Types on props and state (no `any`)?
- [ ] useEffect deps correct? Stale closure risk?
- [ ] Keys on lists stable and unique?

## Security / Data (when relevant)

- [ ] User input sanitized?
- [ ] Secrets not in repo?
- [ ] localStorage schema versioned if shape can change?

## Interview Test

Close the file. Explain the data flow aloud in 60 seconds. If you stall, you are not done.
