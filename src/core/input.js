// src/core/input.js

/**
 * Creates keyboard input tracking for pressed and released keys.
 *
 * @returns {{ isPressed: (key: string) => boolean }} Keyboard input query helpers.
 */
export function createInput() {
  const keys = new Set();

  window.addEventListener("keydown", (event) => {
    keys.add(event.key);
  });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.key);
  });

  /**
   * Checks whether a key is currently pressed.
   *
   * @param {string} key - Keyboard key value to test, such as "ArrowLeft".
   * @returns {boolean} True when the key is currently held down.
   */
  function isPressed(key) {
    return keys.has(key);
  }

  return {
    isPressed,
  };
}
