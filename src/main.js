// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { createInput } from "./core/input.js";
import { createShip3D } from "./objects/ship3d.js";
import { createStarfield } from "./objects/starfield.js";
import { createCamera3D } from "./core/camera.js";
import { createEnemyShip3D } from "./objects/enemyShip3d.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);
const input = createInput();

const ship3D = createShip3D(screen);
const starfield = createStarfield(screen);
const camera = createCamera3D();

// Crear naves enemigas
const enemies = [];

for (let i = 0; i < 8; i++) {
  enemies.push(createEnemyShip3D(screen));
}

function update(deltaTime) {
  ship3D.update(input, deltaTime);
  camera.update(deltaTime, ship3D.getVelocity());
  starfield.update(deltaTime, ship3D.getVelocity());

  for (const enemy of enemies) {
    enemy.update(deltaTime, camera);
  }
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

  // Targeting: buscar nave más cercana al centro
  let target = null;
  let bestDistance = Infinity;

  const centerX = screen.width() / 2;
  const centerY = screen.height() / 2;

  for (const enemy of enemies) {
    const pos = enemy.getScreenPosition(camera);

    if (!pos) continue;

    const dx = pos.x - centerX;
    const dy = pos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bestDistance) {
      bestDistance = distance;
      target = pos;
    }
  }

  if (target) {
    renderer.drawRect(target.x - 25, target.y - 25, 50, 50);
    renderer.drawText("TARGET", target.x + 30, target.y - 30);
  }
}

const game = createGame(update, render);
game.start();