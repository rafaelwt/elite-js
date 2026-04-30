// src/main.js

import { createScreen } from "./core/screen.js";
import { createRenderer } from "./core/renderer.js";
import { createGame } from "./core/game.js";
import { rotatePoint } from "./math/vector2.js";
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
const STAR_COUNT = 100;

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * screen.width(),
        y: Math.random() * screen.height(),
    });
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
     */

    ship.x += ship.velocityX * deltaTime;
    ship.y += ship.velocityY * deltaTime;
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
        renderer.drawPoint(star.x, star.y);
    }

    const transformedPoints = shipModel.points.map((point) => {
        const rotated = rotatePoint(point, ship.angle);

        return {
            x: rotated.x + ship.x,
            y: rotated.y + ship.y,
        };
    });

    renderer.drawWireframe(transformedPoints, shipModel.edges);
}

const game = createGame(update, render);
game.start();
