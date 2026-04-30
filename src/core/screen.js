// src/core/screen.js

/**
 * Creates a full-window canvas screen wrapper from an existing canvas element.
 *
 * @param {string} canvasId - DOM id of the canvas element to use.
 * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: () => number, height: () => number }} Canvas element, context, and dimension helpers.
 * @throws {Error} If no canvas exists with the provided id.
 */
export function createScreen(canvasId) {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    throw new Error(`Canvas with id "${canvasId}" not found`);
  }

  const ctx = canvas.getContext("2d");

  /**
   * Resizes the canvas to match the browser viewport.
   *
   * @returns {void}
   */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  return {
    canvas,
    ctx,
    /**
     * Gets the current canvas width.
     *
     * @returns {number} Canvas width in pixels.
     */
    width: () => canvas.width,
    /**
     * Gets the current canvas height.
     *
     * @returns {number} Canvas height in pixels.
     */
    height: () => canvas.height,
  };
}
