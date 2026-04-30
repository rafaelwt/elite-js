// src/math/vector3.js

export function rotateY(point, angle) {
  /**
   * Rotación alrededor del eje Y.
   *
   * Tema: trigonometría 3D
   *
   * El eje Y queda fijo.
   * Cambian X y Z.
   */
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: point.x * cos - point.z * sin,
    y: point.y,
    z: point.x * sin + point.z * cos,
  };
}