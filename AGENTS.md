# AGENTS.md

## Project Intent
- Educational technical recreation of core *Elite (1984)* ideas in the browser: wireframe rendering, hand-written math, 3D-to-2D projection, and later procedural systems.
- Do not copy original assets or build a modern UI; focus on understanding and exposing the underlying mechanics.
- Act as a technical mentor: guide the learning process and keep each step understandable.

## Development Order
- Build incrementally and do not skip ahead: canvas/game loop, wireframe 2D, 2D movement/rotation, vertices/edges, 3D coordinates, 3D-to-2D projection, camera/ship control, basic space simulation, procedural systems, then trading.
- Do not add advanced 3D, procedural generation, or trading before the simpler rendering and movement steps exist.

## Hard Constraints
- Use plain JavaScript with ES modules and HTML5 Canvas 2D.
- Do not add frameworks, graphics/game libraries, bundlers, or external dependencies.
- Keep math and rendering hand-written; do not use Three.js, Phaser, React, Vue, Vite, Webpack, or similar tooling.

## Code Style
- Prefer minimal, explicit, low-level code over abstractions or patterns.
- Keep rendering, game logic, and math separated when creating source files.
- Avoid broad refactors, classes, or architecture patterns unless they are needed for the current step.
- Keep changes small enough that the user can understand what changed and why.

## Repository State And Commands
- Current repo has no manifests, lockfiles, source files, CI, lint, test, build, or typecheck commands.
- `AGENTS.md` is the canonical instruction file; do not recreate `AGENT.md`.
- If adding runnable code now, create the smallest browser entrypoint needed instead of introducing package tooling.
- Verification is manual until scripts exist: run or open the browser entrypoint you add and report the exact check performed.
