# ✅ Checklist de progreso — Elite JS

## 🧱 Fase 1 — Base 2D

- [x] Crear `index.html` con canvas
- [x] Ajustar canvas al tamaño de la pantalla (resize)
- [x] Crear `screen.js`
- [x] Obtener contexto 2D (`ctx`)
- [x] Crear `renderer.js`
- [x] Implementar `clear()`
- [x] Implementar `drawLine()`
- [x] Implementar `drawWireframe(points, edges)`
- [x] Dibujar figura simple (línea)
- [x] Dibujar figura wireframe (triángulo)
- [x] Crear game loop (`requestAnimationFrame`)

---

## 🚀 Fase 2 — Movimiento

- [x] Implementar traslación (movimiento en X)
- [x] Entender relación: posición + velocidad * tiempo
- [x] Separar modelo (`shipModel`) de instancia (`ship`)
- [x] Implementar rotación 2D (`sin`, `cos`)
- [x] Aplicar rotación a puntos
- [x] Entender sistema de coordenadas local
- [x] Crear sistema de input (`input.js`)
- [x] Rotar nave con teclado (ArrowLeft / ArrowRight)

---

## 🚀 Fase 2 (continuación) — Movimiento real tipo nave

- [x] Calcular dirección de la nave (vector forward)
- [x] Implementar aceleración hacia adelante
- [x] Agregar inercia
- [x] Combinar rotación + movimiento
- [x] Agregar fricción leve

---

## 🌌 Fase 3 — Espacio

- [x] Crear estrellas aleatorias
- [x] Renderizar estrellas
- [x] Mover estrellas con profundidad simple
- [x] Crear starfield 3D con `z`
- [x] Mantener nave estable visualmente
- [x] Crear cámara lógica básica
- [x] Movimiento relativo usando velocidad de la nave

---

## 🧊 Fase 5 — 3D CORE

- [x] Crear estructura de puntos 3D `(x, y, z)`
- [x] Implementar proyección 3D → 2D
- [x] Dibujar wireframe 3D
- [x] Rotación en eje Y
- [x] Rotación en eje X
- [x] Rotación en eje Z
- [x] Entender que el orden de rotaciones importa
- [x] Separar modelo 3D de estado de nave
- [x] Crear nave wireframe simple estilo Elite
- [x] Crear objeto 3D externo en el mundo
- [x] Implementar clipping básico `near plane`
- [x] Reciclar objeto cuando pasa la cámara

---

## Arquitectura lograda

### Core
- [x] `screen.js` — acceso a canvas y dimensiones
- [x] `renderer.js` — primitivas de dibujo
- [x] `game.js` — game loop con deltaTime
- [x] `input.js` — tracking de teclado con `event.code` + `preventDefault`
- [x] `camera.js` — posición lógica + `worldToCamera()`

### Objetos
- [x] `ship3d.js` — nave con orientación, velocidad, update/render autocontenidos
- [x] `starfield.js` — estrellas 3D con reciclaje
- [x] `testObject3d.js` — cubo wireframe en el mundo con clipping y reciclaje

### Math
- [x] `vector2.js` — `rotatePoint()`
- [x] `vector3.js` — `rotateX()`, `rotateY()`, `rotateZ()`
- [x] `projection.js` — `projectPoint()` perspectiva simple

---

## En progreso ahora

- [ ] Ordenar render por profundidad
- [ ] Crear varios objetos 3D en el mundo
- [ ] Mejorar sistema de cámaras/mundo

---

## 🌍 Fase 6 — Procedural (futuro)

- [ ] Crear sistema de semilla
- [ ] Generar sistemas estelares
- [ ] Generar nombres procedurales
- [ ] Generar propiedades (economía, gobierno, etc.)
- [ ] Generar descripciones textuales