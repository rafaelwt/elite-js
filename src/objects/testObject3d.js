// src/objects/testObject3d.js

import { rotateX, rotateY, rotateZ } from "../math/vector3.js";
import { projectPoint } from "../math/projection.js";

export function createTestObject3D(screen) {
  const state = {
    x: 0,
    y: 0,
    z: 600,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
  };

  const model = {
    points: [
      { x: -50, y: -50, z: -50 },
      { x: 50, y: -50, z: -50 },
      { x: 50, y: 50, z: -50 },
      { x: -50, y: 50, z: -50 },

      { x: -50, y: -50, z: 50 },
      { x: 50, y: -50, z: 50 },
      { x: 50, y: 50, z: 50 },
      { x: -50, y: 50, z: 50 },
    ],

    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ],
  };

  function update(deltaTime, camera) {
    state.rotY += 0.8 * deltaTime;
    state.rotX += 0.4 * deltaTime;

    const cameraPoint = camera.worldToCamera(state);

    // Si el cubo queda detrás o demasiado cerca,
    // lo volvemos a colocar más adelante en el mundo.
    if (cameraPoint.z <= 10) {
      state.x = (Math.random() - 0.5) * 600;
      state.y = (Math.random() - 0.5) * 400;
      state.z = camera.getPosition().z + 800;
    }
  }

  function render(renderer, camera) {
    const projectedPoints = model.points.map((point) => {
      const rY = rotateY(point, state.rotY);
      const rX = rotateX(rY, state.rotX);
      const rZ = rotateZ(rX, state.rotZ);

      const worldPoint = {
        x: rZ.x + state.x,
        y: rZ.y + state.y,
        z: rZ.z + state.z,
      };

      const cameraPoint = camera.worldToCamera(worldPoint);

      // Evita proyectar puntos demasiado cerca o detrás de la cámara.
      // Tema: clipping / near plane
      if (cameraPoint.z <= 10) {
        return null;
      }

      return projectPoint(
        cameraPoint,
        screen.width() / 2,
        screen.height() / 2,
        300
      );
    });

    // Si algún punto queda detrás de la cámara, no dibujamos el cubo.
    if (projectedPoints.some((point) => point === null)) {
      return;
    }

    renderer.drawWireframe(projectedPoints, model.edges);
  }

  return {
    update,
    render,

    getDepth(camera) {
      const cameraPoint = camera.worldToCamera(state);
      return cameraPoint.z;
    },

    setPosition(x, y, z) {
      state.x = x;
      state.y = y;
      state.z = z;
    },
  };
}