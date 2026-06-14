# Devlog — Phase 1: Toolchain & Window

Goal: CMake + vcpkg project, SFML window opens, game loop runs, CI green on GitHub Actions.
Skill being proven: build systems & dependency management.

Status: **BUILT** — exe compiles. Run once to confirm the window.

## Log

### 2026-06-11 — Bootstrap complete
- Installed: Git 2.54, CMake, VS 2022 Build Tools, vcpkg @ `C:\Tools\vcpkg`
- `VCPKG_ROOT` set machine-wide
- vcpkg built SFML 3.0.2 + deps (~1.2 min)
- `cmake --preset default` + `cmake --build --preset default` — green
- Output: `build\Debug\LightYears.exe`
- Local git commit on `main`, remote `origin` -> github.com/solufelo/light-years-game
- Next: run the exe, devlog screenshot, say "push it" when ready for GitHub
