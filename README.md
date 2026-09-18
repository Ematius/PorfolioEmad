# 💼 Portfolio v2 — React / Vite / TypeScript

## 🇪🇸 Español

### 📖 Descripción

Este proyecto es mi **segundo portafolio personal como desarrollador web**, construido después de completar un curso centrado en **React, Vite y TypeScript**.

El objetivo principal de este portafolio es **mostrar los conocimientos adquiridos durante el curso**, así como presentar algunos de los proyectos en los que he trabajado durante mi proceso de aprendizaje.

El proyecto sigue una estructura moderna basada en **componentes reutilizables, tipado fuerte con TypeScript y buenas prácticas de organización del código**.

Este portafolio representa una evolución respecto a mi primer portafolio desarrollado con **Angular**, incorporando nuevas herramientas y un flujo de desarrollo más optimizado.

---

### 🛠️ Tecnologías utilizadas

- React
- Vite
- TypeScript
- SCSS Modules
- i18n (Internacionalización)
- Netlify (Deployment)

---

### ✨ Características

- Arquitectura basada en **componentes reutilizables**
- Tipado con **TypeScript**
- Estilos encapsulados con **SCSS Modules**
- Sistema de **traducción multiidioma**
- Sección de proyectos dinámica
- Formulario de contacto
- Deploy automático con **Netlify**

---

### 📂 Estructura del proyecto

```bash
public

src
│
├── assets
│
├── components
│   └── core
│       ├── Header.tsx
│       ├── Header.module.scss
│       ├── Footer.tsx
│       ├── Footer.module.scss
│       ├── Hero.tsx
│       ├── Hero.module.scss
│       ├── Experience.tsx
│       ├── Experience.module.scss
│       ├── Projects.tsx
│       ├── Projects.module.scss
│
├── data
│   └── projects.ts
│
├── i18n
│   └── translations.ts
│
├── styles
│
├── App.tsx
├── main.tsx
└── setupTest.ts
```

### 📸 Secciones del portafolio

El sitio incluye:

Hero / Presentación

Experiencia

Proyectos

Formulario de contacto

Cada sección está desarrollada como un componente independiente, facilitando la escalabilidad y mantenimiento del proyecto.

### 📈 Objetivo del proyecto

Este portafolio forma parte de mi proceso de formación como Full Stack Developer.

Durante mi aprendizaje también he trabajado con tecnologías como:

Angular

NestJS

MySQL

WordPress

Este proyecto representa una fase de consolidación en el ecosistema React.

## 🇬🇧 English

### 📖 Description

This project is my **second personal portfolio as a web developer**, built after completing a course focused on **React, Vite and TypeScript**.

The main goal of this portfolio is **to showcase the knowledge acquired during the course**, as well as present some of the projects I have worked on during my learning process.

The project follows a modern structure based on **reusable components, strong typing with TypeScript, and good code organization practices**.

This portfolio represents an evolution compared to my first portfolio developed with **Angular**, incorporating new tools and a more optimized development workflow.

---

### 🛠️ Technologies used

- React
- Vite
- TypeScript
- SCSS Modules
- i18n (Internationalization)
- Netlify (Deployment)

---

### ✨ Features

- Architecture based on **reusable components**
- **TypeScript** typing
- Styles encapsulated with **SCSS Modules**
- **Multi-language translation system**
- Dynamic projects section
- Contact form
- Automatic deployment with **Netlify**

---

### 📂 Project structure

```bash
public

src
│
├── assets
│
├── components
│   └── core
│       ├── Header.tsx
│       ├── Header.module.scss
│       ├── Footer.tsx
│       ├── Footer.module.scss
│       ├── Hero.tsx
│       ├── Hero.module.scss
│       ├── Experience.tsx
│       ├── Experience.module.scss
│       ├── Projects.tsx
│       ├── Projects.module.scss
│
├── data
│   └── projects.ts
│
├── i18n
│   └── translations.ts
│
├── styles
│
├── App.tsx
├── main.tsx
└── setupTest.ts
```

### 📸 Portfolio sections

The site includes:

Hero / Introduction

Experience

Projects

Contact form

Each section is developed as an independent component, making the project easier to scale and maintain.

### 📈 Project goal

This portfolio is part of my training process as a **Full Stack Developer**.

During my learning journey I have also worked with technologies such as:

Angular

NestJS

MySQL

WordPress

This project represents a consolidation phase within the **React ecosystem**.

| Archivo                              | Qué hace                                                                                                                                  | Piensa en él como…                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `AiLabActivationButton.tsx`          | Es el botón **ACTIVAR AI LAB** que tienes en el portfolio. Recibe `onActivate` y avisa al componente superior cuando lo pulsas.           | El **interruptor de entrada**        |
| `AiLabActivationButton.module.scss`  | Da forma, animación y estética a ese botón.                                                                                               | La **carcasa del interruptor**       |
| `AiLabTransitionOverlay.tsx`         | Controla el vídeo a pantalla completa: reproducción, sonido, silenciar, saltar, `Escape`, bloqueo del scroll y qué hacer cuando termina.  | La **cinemática de entrada**         |
| `AiLabTransitionOverlay.module.scss` | Posición fullscreen, botones, barra de progreso, responsive, etc.                                                                         | La **presentación de la cinemática** |
| `AiLabEntry.tsx`                     | Es el más importante. Controla partículas, despertar, qué sección está activa, PROYECTOS/RECORRIDO, paneles y conecta React con Three.js. | El **director de orquesta**          |
| `AiLabEntry.module.scss`             | Todo el escenario CSS: oscuridad, partículas, horizonte, etiquetas, panel lateral, animaciones, móvil…                                    | La **dirección artística**           |
| `AiLabScene3D.tsx`                   | Construye los tres monolitos 3D, luces, cámara, hover, movimiento y clicks.                                                               | El **escenario 3D**                  |
| `AiLabSceneBoundary.tsx`             | Si Three.js/WebGL falla, impide que ese error destruya todo AI Lab. Devuelve `null` y permanece el fondo/fallback CSS.                    | El **fusible del 3D**                |
| `AiLabLoadingFallback.tsx`           | Muestra una pantalla sencilla mientras se carga AI Lab, por ejemplo si el componente está cargándose de manera diferida.                  | La **pantalla “cargando…”**          |
| `AiLabErrorBoundary.tsx`             | Es una protección más amplia: si se rompe AI Lab, muestra un mensaje de error y permite regresar al portfolio.                            | El **plan de emergencia general**    |
