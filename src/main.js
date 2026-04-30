// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { rotatePoint } from "./math/vector2.js";
import { createInput } from "./core/input.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);
const input = createInput();

const shipModel = {
  points: [
    { x: 0, y: -50 },
    { x: -35, y: 35 },
    { x: 35, y: 35 },
  ],
  edges: [
    [0, 1],
    [1, 2],
    [2, 0],
  ],
};

const ship = {
  x: screen.width() / 2,
  y: screen.height() / 2,
  angle: 0,
};

/**
 * Updates ship rotation from keyboard input.
 *
 * @param {number} deltaTime - Seconds elapsed since the previous frame.
 * @returns {void}
 */
function update(deltaTime) {
  const rotationSpeed = 3; // radianes por segundo

  if (input.isPressed("ArrowLeft")) {
    ship.angle -= rotationSpeed * deltaTime;
  }

  if (input.isPressed("ArrowRight")) {
    ship.angle += rotationSpeed * deltaTime;
  }
}

/**
 * Draws the rotated ship wireframe at its current screen position.
 *
 * @returns {void}
 */
function render() {
  renderer.clear();

  const transformedPoints = shipModel.points.map((point) => {
    const rotated = rotatePoint(point, ship.angle);

    return {
      x: rotated.x + ship.x,
      y: rotated.y + ship.y,
    };
  });

  renderer.drawWireframe(transformedPoints, shipModel.edges);
}

const game = createGame(update, render);
game.start();
