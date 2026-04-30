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

export function rotateX(point, angle) {
  /**
   * Rotación alrededor del eje X.
   *
   * Tema: trigonometría 3D
   *
   * El eje X queda fijo.
   * Cambian Y y Z.
   */
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}