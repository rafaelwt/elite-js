// src/core/camera.js

export function createCamera3D() {
  const state = {
    x: 0,
    y: 0,
    z: 0,
  };

  function update(deltaTime, velocity) {
    state.x += velocity.x * deltaTime;
    state.y += velocity.y * deltaTime;
    state.z += velocity.z * deltaTime;
  }

  function getPosition() {
    return {
      x: state.x,
      y: state.y,
      z: state.z,
    };
  }

  return {
    update,
    getPosition,
  };
}