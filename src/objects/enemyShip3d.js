// src/objects/enemyShip3d.js

import { rotateX, rotateY, rotateZ } from "../math/vector3.js";
import { projectPoint } from "../math/projection.js";

export function createEnemyShip3D(screen) {
  const state = {
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 600,
    z: Math.random() * 1200 + 400,

    rotX: 0,
    rotY: Math.random() * Math.PI * 2,
    rotZ: 0,
  };

  const model = {
    points: [
      { x: 0, y: 0, z: -70 }, // 0 punta
      { x: -60, y: 15, z: 40 }, // 1 ala izquierda
      { x: 60, y: 15, z: 40 }, // 2 ala derecha
      { x: 0, y: -25, z: 30 }, // 3 parte superior
      { x: 0, y: 30, z: 50 }, // 4 parte inferior
    ],
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 4],
      [1, 2],
      [3, 4],
    ],
  };

  function update(deltaTime, camera) {
    state.rotY += 0.4 * deltaTime;

    const cameraPoint = camera.worldToCamera(state);

    if (cameraPoint.z <= 20) {
      state.x = (Math.random() - 0.5) * 1000;
      state.y = (Math.random() - 0.5) * 600;
      state.z = camera.getPosition().z + Math.random() * 1200 + 600;
    }
  }

  function getDepth(camera) {
    return camera.worldToCamera(state).z;
  }

  function getScreenPosition(camera) {
    const cameraPoint = camera.worldToCamera(state);

    if (cameraPoint.z <= 20) {
      return null;
    }

    return projectPoint(
      cameraPoint,
      screen.width() / 2,
      screen.height() / 2,
      300
    );
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

      if (cameraPoint.z <= 20) {
        return null;
      }

      return projectPoint(
        cameraPoint,
        screen.width() / 2,
        screen.height() / 2,
        300
      );
    });

    if (projectedPoints.some((point) => point === null)) {
      return;
    }

    renderer.drawWireframe(projectedPoints, model.edges);
  }

  return {
    update,
    render,
    getDepth,
    getScreenPosition,
  };
}