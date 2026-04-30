// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { createInput } from "./core/input.js";
import { createShip3D } from "./objects/ship3d.js";
import { createStarfield } from "./objects/starfield.js";
import { createCamera3D } from "./core/camera.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);
const input = createInput();

const ship3D = createShip3D(screen);
const starfield = createStarfield(screen);
const camera = createCamera3D();

function update(deltaTime) {
  ship3D.update(input, deltaTime);
  camera.update(deltaTime, ship3D.getVelocity());
  starfield.update(deltaTime, ship3D.getVelocity());
}

function render() {
  renderer.clear();
  starfield.render(renderer);
  ship3D.render(renderer);
}

const game = createGame(update, render);
game.start();