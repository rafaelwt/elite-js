// src/core/renderer.js

/**
 * Creates primitive canvas drawing helpers for the game screen.
 *
 * @param {{ ctx: CanvasRenderingContext2D, width: () => number, height: () => number }} screen - Screen wrapper that supplies canvas dimensions and context.
 * @returns {{ clear: () => void, drawLine: (x1: number, y1: number, x2: number, y2: number) => void, drawWireframe: (points: Array<{ x: number, y: number }>, edges: Array<[number, number]>) => void }} Rendering helpers for clearing and drawing wireframes.
 */
export function createRenderer(screen) {
  const { ctx, width, height } = screen;

  /**
   * Fills the full canvas with the background color.
   *
   * @returns {void}
   */
  function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width(), height());
  }

  /**
   * Draws a white line segment between two screen positions.
   *
   * @param {number} x1 - Starting horizontal coordinate in pixels.
   * @param {number} y1 - Starting vertical coordinate in pixels.
   * @param {number} x2 - Ending horizontal coordinate in pixels.
   * @param {number} y2 - Ending vertical coordinate in pixels.
   * @returns {void}
   */
  function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  /**
   * Draws a wireframe by connecting indexed point pairs.
   *
   * @param {Array<{ x: number, y: number }>} points - Screen-space points used by the wireframe.
   * @param {Array<[number, number]>} edges - Point index pairs that define line segments.
   * @returns {void}
   */
  function drawWireframe(points, edges) {
    for (const edge of edges) {
      const start = points[edge[0]];
      const end = points[edge[1]];

      drawLine(start.x, start.y, end.x, end.y);
    }
  }

  return {
    clear,
    drawLine,
    drawWireframe,
  };
}
