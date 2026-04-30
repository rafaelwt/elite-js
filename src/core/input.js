// src/core/input.js

/**
 * Creates keyboard input tracking for pressed and released keys.
 *
 * @returns {{ isPressed: (key: string) => boolean }} Keyboard input query helpers.
 */
export function createInput() {
  const keys = new Set();

  window.addEventListener("keydown", (event) => {
    event.preventDefault();

    keys.add(event.code);
  });

  window.addEventListener("keyup", (event) => {
    event.preventDefault();

    keys.delete(event.code);
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
