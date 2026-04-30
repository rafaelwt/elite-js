// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { rotatePoint } from "./math/vector2.js";
import { rotateX, rotateY, rotateZ } from "./math/vector3.js";
import { projectPoint } from "./math/projection.js";
import { createInput } from "./core/input.js";

const screen = createScreen("screen");
const renderer = createRenderer(screen);
const input = createInput();

// Estrellas de fondo (efecto de profundidad)
//
// Tema: simululación básica / efecto visual
//
// - Array de posiciones (x, y) generadas aleatoriamente
// - Crea la ilusión de estrellas en el fondo del espacio
// - Las estrellas son fijas (no se mueven) para dar sensación de profundidad
// - El número define la densidad del campo de estrellas
const stars = [];

const STAR_COUNT = 200;
const STAR_DEPTH = 800;

function createStar() {
  return {
    x: (Math.random() - 0.5) * screen.width(),
    y: (Math.random() - 0.5) * screen.height(),
    z: Math.random() * STAR_DEPTH + 1,
  };
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(createStar());
}

const shipModel = {
  points: [
    { x: 0, y: -50 },
    { x: -35, y: 35 },
    { x: 35, y: 35 },
  ],
  edges: [
    [0, 1],
    [1, 2],
    [2, 0],
  ],
};

const ship = {
  x: screen.width() / 2,
  y: screen.height() / 2,
  angle: 0,
  velocityX: 0,
  velocityY: 0,
};

let angleX = 0;
let angleY = 0;
let angleZ = 0;

// Estado 3D de la nave (para pruebas con pirámide)
const ship3D = {
  x: 0,
  y: 0,
  z: 200,

  rotX: 0,
  rotY: 0,
  rotZ: 0,

  velocityX: 0,
  velocityY: 0,
  velocityZ: 0,
};

// Modelo 3D de pirámide (para prueba de proyección)
const pyramidModel3D = {
  points: [
    { x: 0, y: -60, z: 0 }, // punta superior
    { x: -50, y: 40, z: -50 }, // base izquierda cercana
    { x: 50, y: 40, z: -50 }, // base derecha cercana
    { x: 0, y: 40, z: 50 }, // base trasera
  ],
  edges: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [2, 3],
    [3, 1],
  ],
};

/**
 * Updates ship state based on keyboard input.
 *
 * @param {number} deltaTime - Seconds elapsed since the previous frame.
 */
function update(deltaTime) {
  // Velocidad de rotación en radianes por segundo
  // Tema: trigonometría (uso de ángulos en radianes)
  const rotationSpeed = 3;

  // Thrust = fuerza de empuje hacia adelante
  // Tema: física básica (aceleración)
  const thrust = 120;

  // Fricción = desaceleración constante que reduce la velocidad
  const friction = 0.98;

  // ROTACIÓN

  if (input.isPressed("ArrowLeft")) {
    // Disminuir el ángulo rota la nave a la izquierda
    ship.angle -= rotationSpeed * deltaTime;
  }

  if (input.isPressed("ArrowRight")) {
    // Aumentar el ángulo rota la nave a la derecha
    ship.angle += rotationSpeed * deltaTime;
  }

  // ACELERACIÓN (THRUST)

  if (input.isPressed("ArrowUp")) {
    /**
     * Convertimos el ángulo en un vector de dirección.
     *
     * Tema: trigonometría (círculo unitario)
     *
     * - sin(angle) → componente X
     * - cos(angle) → componente Y
     *
     * Importante:
     *
     * 1. En canvas, el eje Y crece hacia abajo.
     *    Por eso usamos "-cos" para que "arriba" sea negativo.
     *
     * 2. El modelo de la nave está definido apuntando hacia arriba:
     *    ejemplo: { x: 0, y: -50 } es la punta.
     *
     *    Eso significa que:
     *    angle = 0 → la nave apunta hacia arriba.
     *
     *    Por coherencia, el vector de dirección también debe
     *    empujar en esa misma dirección.
     */

    ship.velocityX += Math.sin(ship.angle) * thrust * deltaTime;
    ship.velocityY -= Math.cos(ship.angle) * thrust * deltaTime;
  }
  // Reduce gradualmente la velocidad.
  ship.velocityX *= friction;
  ship.velocityY *= friction;

  /**
   * Movimiento final
   *
   * Tema: cinemática básica
   *
   * posición = posición + velocidad * tiempo
   *
   * NOTA: La nave se mantiene fija en el centro.
   * Solo las estrellas se mueven (movimiento relativo).
   */

  // ship.x += ship.velocityX * deltaTime;
  // ship.y += ship.velocityY * deltaTime;

  /**
   * Movimiento relativo de estrellas
   *
   * Tema: referencia de sistemas (cámara vs mundo)
   *
   * En vez de mover la nave, movemos el mundo (estrellas)
   * en sentido contrario a la velocidad.
   *
   * Esto crea la ilusión de desplazamiento en el espacio.
   * Visualmente: si la nave avanza hacia arriba, las estrellas
   * parecen caer hacia abajo.
   *
   * También se repositionan las estrellas que salen de pantalla
   * para que aparezcan por el otro lado (efecto de "wrap").
   */

  for (const star of stars) {
    /**
     * Movemos la estrella hacia la cámara.
     *
     * Menor z = más cerca.
     * Mayor z = más lejos.
     */
    star.z -= 200 * deltaTime;

    /**
     * Cuando la estrella pasa "demasiado cerca",
     * la reciclamos al fondo.
     */
    if (star.z <= 1) {
      const newStar = createStar();

      star.x = newStar.x;
      star.y = newStar.y;
      star.z = STAR_DEPTH;
    }
  }

  const rotationSpeed3D = 2;

  // YAW (izquierda / derecha)
  if (input.isPressed("ArrowLeft")) {
    ship3D.rotY -= rotationSpeed3D * deltaTime;
  }

  if (input.isPressed("ArrowRight")) {
    ship3D.rotY += rotationSpeed3D * deltaTime;
  }

  // PITCH (arriba / abajo)
  if (input.isPressed("ArrowUp")) {
    ship3D.rotX -= rotationSpeed3D * deltaTime;
  }

  if (input.isPressed("ArrowDown")) {
    ship3D.rotX += rotationSpeed3D * deltaTime;
  }

  // THRUST 3D
  const thrust3D = 120;
  const friction3D = 0.98;

  if (input.isPressed("KeyW")) {
    /**
     * Movimiento hacia adelante en 3D.
     *
     * Tema: vectores 3D + trigonometría
     *
     * rotY controla izquierda/derecha.
     * rotX controla arriba/abajo.
     *
     * Calculamos una dirección aproximada hacia donde apunta la nave.
     */
    const forwardX = Math.sin(ship3D.rotY);
    const forwardY = -Math.sin(ship3D.rotX);
    const forwardZ = -Math.cos(ship3D.rotY) * Math.cos(ship3D.rotX);

    ship3D.velocityX += forwardX * thrust3D * deltaTime;
    ship3D.velocityY += forwardY * thrust3D * deltaTime;
    ship3D.velocityZ += forwardZ * thrust3D * deltaTime;
  }

  ship3D.velocityX *= friction3D;
  ship3D.velocityY *= friction3D;
  ship3D.velocityZ *= friction3D;

  ship3D.x += ship3D.velocityX * deltaTime;
  ship3D.y += ship3D.velocityY * deltaTime;
  ship3D.z += ship3D.velocityZ * deltaTime;
}

/**
 * Renders the ship wireframe at its current position and rotation.
 */
function render() {
  renderer.clear();

  /**
   * Renderizado de estrellas de fondo
   *
   * Tema: iteración / arrays
   *
   * Recorremos el array de estrellas y dibujamos cada una
   * como un punto (pixel) en su posición (x, y).
   *
   * Esto ocurre antes de dibujar la nave para que las estrellas
   * queden "detrás" (el fondo del espacio).
   */

  for (const star of stars) {
    const projected = projectPoint(
      star,
      screen.width() / 2,
      screen.height() / 2,
      300,
    );

    const size = Math.max(1, 4 * (1 - star.z / STAR_DEPTH));

    renderer.drawPoint(projected.x, projected.y, size);
  }

  const projectedPoints = pyramidModel3D.points.map((point) => {
    // Rotación usando el estado de la nave
    const rY = rotateY(point, ship3D.rotY);
    const rX = rotateX(rY, ship3D.rotX);
    const rZ = rotateZ(rX, ship3D.rotZ);

    // Traslación en 3D
    const translated = {
      x: rZ.x + ship3D.x,
      y: rZ.y + ship3D.y,
      z: rZ.z + ship3D.z,
    };

    return projectPoint(
      translated,
      screen.width() / 2,
      screen.height() / 2,
      300,
    );
  });

  renderer.drawWireframe(projectedPoints, pyramidModel3D.edges);
}

const game = createGame(update, render);
game.start();
