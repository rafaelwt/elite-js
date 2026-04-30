// src/core/screen.js

export function createScreen(canvasId) {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    throw new Error(`Canvas with id "${canvasId}" not found`);
  }

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  return {
    canvas,
    ctx,
    width: () => canvas.width,
    height: () => canvas.height,
  };
}