// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);

const centerX = screen.width() / 2;
const centerY = screen.height() / 2;

const shipPoints = [
  { x: centerX, y: centerY - 50 },
  { x: centerX - 35, y: centerY + 35 },
  { x: centerX + 35, y: centerY + 35 },
];

const shipEdges = [
  [0, 1],
  [1, 2],
  [2, 0],
];

renderer.clear();
renderer.drawWireframe(shipPoints, shipEdges);