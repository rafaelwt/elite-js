// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { createInput } from "./core/input.js";
import { createShip3D } from "./objects/ship3d.js";
import { createStarfield } from "./objects/starfield.js";
import { createCamera3D } from "./core/camera.js";
import { createEnemyShip3D } from "./objects/enemyShip3d.js";
import { createTargetingSystem } from "./systems/targetingSystem.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);
const input = createInput();

const ship3D = createShip3D(screen);
const starfield = createStarfield(screen);
const camera = createCamera3D();
const targeting = createTargetingSystem(screen);

// Crear naves enemigas
const enemies = [];

for (let i = 0; i < 8; i++) {
  enemies.push(createEnemyShip3D(screen));
}

let bestTarget = null;

function update(deltaTime) {
  ship3D.update(input, deltaTime);
  camera.update(deltaTime, ship3D.getVelocity());
  starfield.update(deltaTime, ship3D.getVelocity());

  for (const enemy of enemies) {
    enemy.update(deltaTime, camera);
  }

  bestTarget = targeting.update(input, enemies, camera);
}

function render() {
  renderer.clear();
  starfield.render(renderer);

  // Painter's Algorithm: ordenar por profundidad (más lejos primero)
  const renderQueue = [];

  for (const enemy of enemies) {
    renderQueue.push({
      obj: enemy,
      depth: enemy.getDepth(camera),
    });
  }

  renderQueue.sort((a, b) => b.depth - a.depth);

  for (const item of renderQueue) {
    item.obj.render(renderer, camera);
  }

  // Nave siempre al final (HUD / jugador)
  ship3D.render(renderer);

  // Targeting
  targeting.render(renderer, camera, bestTarget);
}

const game = createGame(update, render);
game.start();