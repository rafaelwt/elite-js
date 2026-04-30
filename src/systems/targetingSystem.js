// src/systems/targetingSystem.js

export function createTargetingSystem(screen) {
  let lockedTarget = null;

  function update(input, enemies, camera) {
    const centerX = screen.width() / 2;
    const centerY = screen.height() / 2;

    let bestTarget = null;
    let bestDistance = Infinity;

    for (const enemy of enemies) {
      const pos = enemy.getScreenPosition(camera);
      if (!pos) continue;

      const dx = pos.x - centerX;
      const dy = pos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestTarget = { enemy, pos };
      }
    }

    // Tecla F → lock target (una sola vez por presión)
    if (input.isPressedOnce("KeyF") && bestTarget) {
      lockedTarget = bestTarget.enemy;
    }

    // Si el target ya no es visible → desbloquear
    if (lockedTarget) {
      const pos = lockedTarget.getScreenPosition(camera);
      if (!pos) {
        lockedTarget = null;
      }
    }

    return bestTarget;
  }

  function render(renderer, camera, bestTarget) {
    let target = null;

    if (lockedTarget) {
      const pos = lockedTarget.getScreenPosition(camera);
      if (pos) {
        target = pos;
      }
    } else if (bestTarget) {
      target = bestTarget.pos;
    }

    if (!target) return;

    renderer.drawRect(target.x - 25, target.y - 25, 50, 50);

    const label = lockedTarget ? "LOCK" : "TARGET";
    renderer.drawText(label, target.x + 30, target.y - 30);
  }

  return {
    update,
    render,
  };
}