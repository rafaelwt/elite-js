// src/objects/starfield.js

import { projectPoint } from "../math/projection.js";

export function createStarfield(screen, count = 200, depth = 800) {
  const stars = [];

  function createStar() {
    return {
      x: (Math.random() - 0.5) * screen.width(),
      y: (Math.random() - 0.5) * screen.height(),
      z: Math.random() * depth + 1,
    };
  }

  for (let i = 0; i < count; i++) {
    stars.push(createStar());
  }

  function update(deltaTime) {
    for (const star of stars) {
      star.z -= 200 * deltaTime;

      if (star.z <= 1) {
        const newStar = createStar();

        star.x = newStar.x;
        star.y = newStar.y;
        star.z = depth;
      }
    }
  }

  function render(renderer) {
    for (const star of stars) {
      const projected = projectPoint(
        star,
        screen.width() / 2,
        screen.height() / 2,
        300
      );

      const size = Math.max(1, 4 * (1 - star.z / depth));

      renderer.drawPoint(projected.x, projected.y, size);
    }
  }

  return {
    update,
    render,
  };
}