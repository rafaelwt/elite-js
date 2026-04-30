// src/core/renderer.js

export function createRenderer(screen) {
  const { ctx, width, height } = screen;

  function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width(), height());
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

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