// src/objects/ship3d.js

export function createShip3D() {
  return {
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
}

export const shipModel3D = {
  points: [
    { x: 0, y: 0, z: -80 }, // 0 punta frontal
    { x: -55, y: 20, z: 40 }, // 1 ala izquierda
    { x: 55, y: 20, z: 40 }, // 2 ala derecha
    { x: 0, y: -25, z: 30 }, // 3 parte superior
    { x: 0, y: 35, z: 45 }, // 4 parte inferior
    { x: -25, y: 15, z: 70 }, // 5 cola izquierda
    { x: 25, y: 15, z: 70 }, // 6 cola derecha
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

    [1, 5],
    [2, 6],
    [5, 6],
    [3, 5],
    [3, 6],
    [4, 5],
    [4, 6],
  ],
};