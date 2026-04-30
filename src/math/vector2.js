// src/math/vector2.js

/**
 * Rotates a 2D point around the origin by an angle in radians.
 *
 * @param {{ x: number, y: number }} point - Point to rotate around the origin.
 * @param {number} angle - Rotation angle in radians.
 * @returns {{ x: number, y: number }} Rotated point coordinates.
 */
export function rotatePoint(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
}
