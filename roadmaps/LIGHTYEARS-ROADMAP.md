# Light Years — C to WebAssembly Pipeline

**S-Tier pivot:** Raylib space shooter + CMake + **Emscripten → WASM**. Recruiters click a link, game runs in browser. Proves raw C memory discipline at a higher level than a .exe download.

**Better alternative:** Open-source the **core engine mechanics** (game loop, entity system, asset pool) as a documented public repo. Tech leads respect low-level architecture you can explain.

**SFML Phase 1 status:** DONE. Not discarded. CMake, vcpkg, fixed-timestep loop, CI transfer directly.

Local build: `C:\Users\Administrator\Projects\light-years-game\build\Debug\LightYears.exe`

## Migration Phases

| Phase | Build | Recruiter-facing proof |
|---|---|---|
| 1 ✅ | SFML scaffold, game loop, CI | "I can set up a C++ pipeline" (done) |
| 2 | Port loop + Application to **Raylib** (same architecture) | Cleaner C API, closer to WASM path |
| 3 | Entity/Actor system, asset manager (open-source this layer) | GitHub README with architecture diagram |
| 4 | Player, shooting, pooling | Playable desktop build |
| 5 | **Emscripten toolchain** + CMake WASM target | `emcmake` / `emmake` integrated |
| 6 | Browser deploy (GitHub Pages or itch.io WASM) | **Live URL on resume** |
| 7 | Polish, devlog, case study writeup | Finished product |

## Tech Stack (target)

| Piece | Choice |
|---|---|
| Language | C (Raylib is C; can stay C++ wrapper if preferred) |
| Graphics/input | Raylib |
| Build | CMake (already have) |
| WASM | Emscripten SDK |
| CI | GitHub Actions (desktop + emscripten job) |
| Host | GitHub Pages or itch.io |

## Open Source Strategy (Better Alternative)

Repo structure suggestion:

```
light-years-game/
  engine/          ← OPEN SOURCE THIS: loop, entities, pools, timers
  game/            ← game-specific: ships, waves, scoring
  platform/
    desktop/       ← Raylib native
    wasm/          ← Emscripten shell + preload assets
```

Document in README: memory ownership, fixed timestep, why no STL in hot paths (if you go pure C).

## Prerequisites (next agent session)

- [ ] Install Emscripten SDK (`emsdk`)
- [ ] Add Raylib via vcpkg or fetch_content
- [ ] Port `Application` from SFML to Raylib (Phase 2)
- [ ] First `emcc` compile of empty window

Say **"pivot light years"** to start Phase 2 migration.

## Cross-links

- NEURO-CALIBRATION.md — Godot C++ aim trainer is parallel C portfolio work
- STUDYOS-ROADMAP.md — full-stack proof alongside low-level proof
- Math arc — trig/linear algebra feeds rotation and projectile math
