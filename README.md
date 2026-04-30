# Elite JS

> Recreación técnica educativa del clásico *Elite (1984)* en el navegador

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/Canvas-2D-blue?logo=html5)](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🎮 Acerca del proyecto

Elite JS es una implementación técnica del icónico juego espacial *Elite (1984)*, diseñada como una herramienta educativa para comprender los fundamentos que hacían posible aquel logro técnico en apenas 32KB.

El proyecto recrea las mecánicas originales paso a paso — renderizado wireframe, proyecciones 3D a 2D, control de nave, simulación espacial y sistemas procedurales — sin usar frameworks ni librerías externas.

> **Nota:** Este es un proyecto educativo. No se copian activos originales ni se busca crear un juego comercial.

## ✨ Características

- **Renderizado wireframe** con HTML5 Canvas 2D
- **Matemáticas escritas a mano** — sin librerías de terceros
- **Sistema de control de nave** con rotación y movimiento
- **Proyección 3D → 2D** implementada desde cero
- **Simulación espacial** básica
- **Sistemas procedurales** para generación de contenido
- **Código modular y documentado** para facilitar el aprendizaje

## 🚀 Demo online

Puedes probar el proyecto directamente en tu navegador sin instalar nada:

**[🚀 Abrir Elite JS](https://elite-js.netlify.app/)**

No requiere instalación ni dependencias.

## 💻 Desarrollo local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/elite-js.git
cd elite-js

# Abrir en el navegador
open index.html
```

## 📂 Estructura del proyecto

```
elite-js/
├── index.html          # Punto de entrada HTML
├── AGENTS.md           # Especificación técnica del proyecto
├── src/
│   ├── main.js         # Archivo principal
│   ├── core/
│   │   ├── game.js     # Game loop
│   │   ├── input.js    # Manejo de entrada de teclado
│   │   ├── renderer.js # Renderizado wireframe
│   │   └── screen.js   # Configuración del canvas
│   └── math/
│       └── vector2.js   # Operaciones vectoriales 2D
└── README.md
```

## 🕹️ Controles

| Tecla | Acción |
|-------|--------|
| `←` | Rotar nave a la izquierda |
| `→` | Rotar nave a la derecha |
| `↑` | Acelerar |

## 📚 Roadmap de desarrollo

El proyecto sigue un orden de construcción incremental:

- [x] Canvas y game loop básico
- [x] Renderizado wireframe 2D
- [x] Movimiento y rotación 2D
- [x] Sistema de entrada por teclado
- [ ] Coordenadas 3D
- [ ] Proyección 3D → 2D
- [ ] Cámara y control de nave
- [ ] Simulación espacial básica
- [ ] Sistemas procedurales
- [ ] Sistema de trading

## ⚙️ Restricciones técnicas

- **Solo vanilla JavaScript** con ES modules
- **HTML5 Canvas 2D** para renderizado
- **Sin frameworks** (Three.js, Phaser, React, Vue)
- **Sin bundlers** (Vite, Webpack)
- **Sin dependencias externas**
- Matemáticas y rendering implementados desde cero

## 📖 Recursos

- [MDN Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
- [Elite (1984) - Wikipedia](https://en.wikipedia.org/wiki/Elite_(video_game))
- [Computers for Everyone - Elite](https://www.bbcelite.com/)

## 📄 Licencia

MIT © 2024