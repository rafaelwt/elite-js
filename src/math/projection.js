// src/math/projection.js

export function projectPoint(point, centerX, centerY, distance) {
  /**
   * Proyección perspectiva simple.
   *
   * Tema: geometría 3D / perspectiva
   *
   * Mientras mayor sea z, más pequeño se verá el objeto.
   * distance controla qué tan fuerte es la perspectiva.
   */
  const scale = distance / (distance + point.z);

  return {
    x: centerX + point.x * scale,
    y: centerY + point.y * scale,
  };
}