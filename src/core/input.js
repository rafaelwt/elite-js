// src/core/input.js

/**
 * Creates keyboard input tracking for pressed and released keys.
 *
 * @returns {{ isPressed: (key: string) => boolean }} Keyboard input query helpers.
 */
export function createInput() {
  const keys = new Set();
  const pressedOnce = new Set();

  window.addEventListener("keydown", (event) => {
    event.preventDefault();

    if (!keys.has(event.code)) {
      pressedOnce.add(event.code);
    }

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

  /**
   * Checks whether a key was just pressed this frame.
   * Only returns true once per key press.
   *
   * @param {string} key - Keyboard key code to test, such as "KeyF".
   * @returns {boolean} True only on the first frame the key is pressed.
   */
  function isPressedOnce(key) {
    if (pressedOnce.has(key)) {
      pressedOnce.delete(key);
      return true;
    }
    return false;
  }

  return {
    isPressed,
    isPressedOnce,
  };
}
