// src/objects/ship3d.js

import { rotateX, rotateY, rotateZ } from "../math/vector3.js";
import { projectPoint } from "../math/projection.js";

export function createShip3D(screen) {
  const state = {
    x: 0,
    y: 0,
    z: 200,

    rotX: 0,
    rotY: 0,
    rotZ: 0,

    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
  };

  const model = {
    points: [
      { x: 0, y: 0, z: -80 },
      { x: -55, y: 20, z: 40 },
      { x: 55, y: 20, z: 40 },
      { x: 0, y: -25, z: 30 },
      { x: 0, y: 35, z: 45 },
      { x: -25, y: 15, z: 70 },
      { x: 25, y: 15, z: 70 },
    ],
    edges: [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 3], [2, 3], [1, 4], [2, 4],
      [1, 5], [2, 6], [5, 6],
      [3, 5], [3, 6], [4, 5], [4, 6],
    ],
  };

  function update(input, deltaTime) {
    const rotationSpeed = 2;
    const thrust = 120;
    const friction = 0.98;

    // Rotación
    if (input.isPressed("ArrowLeft")) state.rotY -= rotationSpeed * deltaTime;
    if (input.isPressed("ArrowRight")) state.rotY += rotationSpeed * deltaTime;
    if (input.isPressed("ArrowUp")) state.rotX -= rotationSpeed * deltaTime;
    if (input.isPressed("ArrowDown")) state.rotX += rotationSpeed * deltaTime;

    // Movimiento (W)
    if (input.isPressed("KeyW")) {
      const forwardX = Math.sin(state.rotY);
      const forwardY = -Math.sin(state.rotX);
      const forwardZ = -Math.cos(state.rotY) * Math.cos(state.rotX);

      state.velocityX += forwardX * thrust * deltaTime;
      state.velocityY += forwardY * thrust * deltaTime;
      state.velocityZ += forwardZ * thrust * deltaTime;
    }

    state.velocityX *= friction;
    state.velocityY *= friction;
    state.velocityZ *= friction;

    // La nave NO se traduce visualmente hacia la cámara.
    // Su velocidad representa movimiento lógico para mover el mundo/cámara.
    state.x = 0;
    state.y = 0;
    state.z = 200;
  }

  function render(renderer) {
    const projectedPoints = model.points.map((point) => {
      const rY = rotateY(point, state.rotY);
      const rX = rotateX(rY, state.rotX);
      const rZ = rotateZ(rX, state.rotZ);

      const translated = {
        x: rZ.x + state.x,
        y: rZ.y + state.y,
        z: rZ.z + state.z,
      };

      return projectPoint(
        translated,
        screen.width() / 2,
        screen.height() / 2,
        300
      );
    });

    renderer.drawWireframe(projectedPoints, model.edges);
  }

  return {
    update,
    render,

    getVelocity() {
      return {
        x: state.velocityX,
        y: state.velocityY,
        z: state.velocityZ,
      };
    },
  };
}