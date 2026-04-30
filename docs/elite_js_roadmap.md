# 🧭 Roadmap educativo — Elite JS (versión detallada para agentes)

## 🎯 Objetivo general
Construir paso a paso una recreación técnica de las ideas clave de Elite (1984):
- Renderizado wireframe
- Transformaciones geométricas
- Proyección 3D → 2D
- Generación procedural determinista

⚠️ No es un juego completo. Es un proyecto educativo enfocado en entender sistemas.

---

# 🧱 Fase 1 — Base 2D (Fundamentos del render)

## Objetivo
Entender cómo dibujar en pantalla sin librerías.

## Conceptos clave
- Canvas HTML5
- Contexto 2D
- Coordenadas en pantalla
- Loop de render

## Implementaciones
- Crear canvas dinámico (resize)
- Crear renderer con:
  - clear()
  - drawLine(x1, y1, x2, y2)
- Implementar drawWireframe(points, edges)
- Crear game loop (requestAnimationFrame)

## Qué debe explicar el agente
- Qué es el canvas
- Cómo funcionan las coordenadas
- Diferencia entre render estático y loop

## Resultado esperado
- Pantalla negra
- Figura wireframe (triángulo) dibujada

---

# 🚀 Fase 2 — Movimiento (Transformaciones 2D)

## Objetivo
Entender cómo mover y rotar objetos.

## Conceptos clave
- Traslación (translation)
- Rotación 2D
- Ángulos en radianes
- Separación modelo vs instancia

## Implementaciones
- Mover puntos con:
  posición = posición + velocidad * tiempo
- Rotar puntos usando sin y cos
- Separar:
  - shipModel (forma)
  - ship (posición, rotación)

## Input
- Capturar teclado
- Rotar con flechas

## Qué debe explicar el agente
- Por qué la figura no se deforma
- Qué es una transformación
- Qué es un sistema de coordenadas local

## Resultado esperado
- Nave que rota y se mueve

---

# 🌌 Fase 3 — Espacio (Simulación básica)

## Objetivo
Simular un entorno espacial.

## Conceptos clave
- Cámara (viewport)
- Movimiento relativo
- Sistema de coordenadas global

## Implementaciones
- Crear estrellas aleatorias
- Mover estrellas en sentido contrario al movimiento
- Mantener nave centrada en pantalla

## Qué debe explicar el agente
- Diferencia entre mover objeto vs mover mundo
- Qué es una cámara

## Resultado esperado
- Sensación de desplazamiento en el espacio

---

# 🧠 Fase 4 — Matemática (Base sólida)

## Objetivo
Formalizar conceptos matemáticos usados.

## Conceptos clave
- Vectores 2D
- Magnitud
- Normalización
- Dirección

## Implementaciones
- Crear utilidades vectoriales:
  - suma
  - resta
  - normalización
- Calcular dirección de la nave

## Qué debe explicar el agente
- Qué es un vector
- Diferencia entre dirección y magnitud
- Por qué normalizar

## Resultado esperado
- Movimiento basado en dirección real

---

# 🧊 Fase 5 — 3D (CORE del proyecto)

## Objetivo
Pasar de 2D a 3D real.

## Conceptos clave
- Coordenadas (x, y, z)
- Profundidad
- Rotación en ejes X, Y, Z

## Implementaciones
- Definir puntos 3D
- Rotar puntos en 3 ejes
- Implementar proyección:
  x2D = x / z
  y2D = y / z
- Dibujar wireframe 3D proyectado

## Qué debe explicar el agente
- Qué es el eje Z
- Qué es la proyección perspectiva
- Por qué los objetos lejanos se ven pequeños

## Resultado esperado
- Nave en pseudo-3D rotando

---

# 🌍 Fase 6 — Procedural (CORE del sistema)

## Objetivo
Generar un universo sin datos almacenados.

## Conceptos clave
- Semillas (seeds)
- Generación determinista
- Algoritmos simples

## Implementaciones

### 1. Semilla
- Número base que genera todo

### 2. Sistemas estelares
- Generar múltiples sistemas

### 3. Nombres
- Construcción por sílabas

### 4. Propiedades
- Economía
- Gobierno
- Nivel tecnológico
- Población

### 5. Descripción textual
- Frases generadas combinando atributos

## Qué debe explicar el agente
- Qué es generación procedural
- Qué significa determinismo
- Cómo un número genera datos complejos

## Resultado esperado
- Lista de planetas generados dinámicamente

---

# 🎯 Resultado final

El sistema debe permitir entender:

- Cómo se dibuja wireframe
- Cómo se transforman objetos
- Cómo funciona un pipeline 3D básico
- Cómo se proyecta 3D en 2D
- Cómo generar un universo con algoritmos

---

# ⚠️ Reglas globales

- No usar librerías externas
- No usar frameworks
- No sobreingeniería
- No saltar pasos
- Priorizar comprensión

---

# 🧠 Instrucción para agentes IA

El agente debe:

- Explicar cada paso antes de implementarlo
- Generar solo el código mínimo necesario
- No adelantarse a fases futuras
- Actuar como mentor técnico

---

# 📌 Nota final

Este proyecto no busca replicar un juego.
Busca reconstruir una forma de pensar sistemas.
