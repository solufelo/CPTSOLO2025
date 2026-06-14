# Project Zen-WASM — C/Raylib Focus App

A minimalist, high-aesthetic focus timer (Zen Mode) written in C, compiled to WebAssembly (WASM) via Emscripten, ready to be embedded into your Three.js portfolio website.

This is your vertical slice to conquer low-level C memory management and pointer structures after CP264.

---

## The Stack
* **Engine/Renderer**: **Raylib (C)**. Ultra-lightweight, high-performance, and has first-class support for WebAssembly compiling.
* **Compiler/Toolchain**: **Emscripten (emcc)**. Converts your C code and Raylib rendering pipeline into `.wasm` and `.js` modules.
* **Frontend Integration**: HTML5 Canvas + TypeScript / Three.js (to load the WASM canvas into your 3D world).

---

## Project Phases

### Phase 1: Pure C Terminal Engine (The Pointers & State Layer)
*Get the logic working in standard C first. No graphics. Just memory and pointers.*
* **Objective**: Write the timer state machine (Idle $\rightarrow$ Focus $\rightarrow$ Break $\rightarrow$ Complete).
* **Skills**: C structs, pointers, `time.h` manipulation, memory allocation.

### Phase 2: Raylib Desktop GUI (The Aesthetics Layer)
*Add the visual layer using desktop Raylib.*
* **Objective**: Build a clean, glassmorphic UI with smooth progress arcs and curated color palettes.
* **Skills**: Coordinate math, rendering loop, input handling.

### Phase 3: Emscripten Compiling (The WASM Layer)
*Compile the C code for the browser.*
* **Objective**: Install Emscripten SDK (`emsdk`), set up the build command, and output `zen.html` / `zen.js` / `zen.wasm`.
* **Skills**: Emscripten lifecycle hooks, browser-loop vs desktop-loop translation.

### Phase 4: Three.js Integration (The Portfolio Layer)
*Embed it inside your 3D world.*
* **Objective**: Load the compiled WASM canvas as a texture or a floating interactive monitor inside a Three.js scene.

---

## Slice 1: The C Timer Struct & State Machine (Tonight's Goal)

Define the timer state and basic clock tick in standard C. Create `src/zen.h` and `src/zen.c`:

```c
typedef enum {
    STATE_IDLE,
    STATE_FOCUS,
    STATE_BREAK
} ZenState;

typedef struct {
    ZenState state;
    int duration_sec;
    int elapsed_sec;
    // Pointers for custom labels / task context
    char* active_task_title;
} ZenTimer;
```
