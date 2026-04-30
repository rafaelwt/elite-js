// src/core/game.js

/**
 * Creates a browser animation loop that updates state before rendering each frame.
 *
 * @param {(deltaTime: number) => void} update - Function that advances game state by elapsed time.
 * @param {() => void} render - Function that draws the current game state.
 * @returns {{ start: () => void }} Game loop controls.
 */
export function createGame(update, render) {
  let lastTime = 0;

  /**
   * Runs one frame and schedules the next animation frame.
   *
   * @param {number} currentTime - Current animation timestamp in milliseconds.
   * @returns {void}
   */
  function loop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    update(deltaTime);
    render();

    requestAnimationFrame(loop);
  }

  /**
   * Starts the game loop on the next browser animation frame.
   *
   * @returns {void}
   */
  function start() {
    requestAnimationFrame(loop);
  }

  return {
    start,
  };
}
