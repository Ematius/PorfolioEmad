# Portfolio v2 — React, TypeScript & AI Lab

Portfolio personal desarrollado con React, Vite y TypeScript. El proyecto combina un portfolio web creado de forma tradicional con **AI Lab**, una experiencia alternativa e interactiva construida con vídeo, WebGL y modelos 3D.

---

## 🇪🇸 Español

### Sobre el proyecto

Este es mi segundo portfolio personal como desarrollador web. Nació después de completar una formación centrada en React, Vite y TypeScript, con el objetivo de consolidar mis conocimientos y presentar mi experiencia y mis proyectos en una aplicación moderna, responsive y bilingüe.

La primera versión del portfolio fue diseñada y desarrollada manualmente, antes de que las herramientas actuales de inteligencia artificial alcanzaran el nivel que tienen hoy. El resultado cumplía su función, pero despertó en mí una pregunta: **¿hasta dónde podría llevar este mismo proyecto si incorporaba la IA como herramienta creativa y técnica?**

De esa curiosidad nació **AI Lab**: una segunda experiencia dentro del mismo portfolio, con una entrada cinematográfica y un escenario espacial 3D desde el que se puede acceder a Proyectos, Recorrido y Contacto.

La idea, el concepto de AI Lab, su narrativa, la selección de interacciones, la dirección visual y todas las decisiones finales son originales y forman parte de mi visión del proyecto. Los diseños visuales, referencias, vídeos y modelos se desarrollaron mediante herramientas de IA generativa dirigidas a través de mis prompts, pruebas y correcciones. Después, todos esos recursos fueron preparados, integrados y programados dentro de la aplicación.

### Dos experiencias en un mismo portfolio

#### Portfolio principal

- Presentación profesional y stack tecnológico.
- Proyectos dinámicos a partir de una fuente de datos centralizada.
- Experiencia profesional y descarga del CV en español e inglés.
- Formulario de contacto integrado con Netlify Forms.
- Cambio de idioma y tema visual.
- Diseño responsive para escritorio, tablet y móvil.

#### AI Lab

- Botón de activación integrado en el portfolio principal.
- Transición cinematográfica con vídeo y sonido.
- Vídeos específicos para escritorio, tablet vertical y móvil.
- Escena WebGL interactiva con tres sistemas 3D.
- Cámara animada, iluminación, partículas y movimiento ambiental.
- Interacciones mediante hover, clic y navegación por teclado.
- Paneles de Proyectos, Recorrido y Contacto conectados al contenido real del portfolio.
- Carga diferida con `lazy` y `Suspense`.
- Límites de error para aislar fallos de React o WebGL.
- Compatibilidad con `prefers-reduced-motion`.
- Adaptación de cámara, escala y posiciones según el dispositivo.

### Tecnologías principales

| Área | Herramientas |
| --- | --- |
| Frontend | React, TypeScript, React Router |
| Entorno de desarrollo | Vite |
| Estilos | SCSS Modules, diseño responsive |
| 3D y WebGL | Three.js, React Three Fiber, Drei |
| Modelos y recursos | GLB/GLTF, WebP, vídeo MP4 |
| Internacionalización | Sistema i18n propio en español e inglés |
| Calidad | ESLint, Vitest, Testing Library |
| Despliegue | Netlify, despliegue continuo desde GitHub |

### IA, diseño 3D y flujo creativo

AI Lab no se produjo con una única instrucción automática. Fue un proceso iterativo en el que combiné dirección creativa, generación asistida, edición de recursos, programación y pruebas.

| Herramienta | Uso dentro del proyecto |
| --- | --- |
| **ChatGPT** | Desarrollo de prompts, exploración de conceptos, planificación del flujo de trabajo, coordinación de herramientas, apoyo en programación, depuración y revisión responsive. |
| **ChatGPT Images** | Creación e iteración de referencias visuales para planetas, satélites, monolitos y otros elementos de la dirección artística. |
| **Meshy AI** | Conversión y generación de las figuras y recursos 3D utilizados como base para los modelos del escenario. |
| **Blender** | Revisión, preparación y ajuste de los modelos 3D antes de utilizarlos en la web y exportación al formato GLB cuando fue necesario. |
| **BytePlus Lumina** | Generación de la transición cinematográfica de entrada a AI Lab, incluyendo versiones adaptadas a distintas proporciones de pantalla. |
| **Three.js** | Renderizado WebGL, materiales, luces, cámara y animación de la escena 3D en el navegador. |
| **React Three Fiber** | Integración declarativa de Three.js dentro de React y conexión entre la escena 3D y el estado de la interfaz. |
| **Drei** | Carga de modelos GLTF y texturas, además de utilidades para la escena Three.js. |

El flujo de trabajo seguido fue:

1. Definición de la idea, narrativa y dirección visual.
2. Creación de referencias mediante generación de imágenes y prompts iterativos.
3. Generación de modelos con Meshy AI.
4. Revisión y preparación de recursos con Blender.
5. Integración y programación con React, TypeScript y Three.js.
6. Creación de la cinemática con BytePlus Lumina.
7. Ajustes responsive, optimización, accesibilidad, depuración y pruebas finales.

### Autoría y uso responsable de IA

La inteligencia artificial se ha utilizado como un conjunto de herramientas de producción y asistencia, no como sustituto de la autoría del proyecto.

- La idea de AI Lab y su integración en el portfolio son propias.
- La dirección creativa, los prompts y las decisiones de diseño fueron definidos por mí.
- Los resultados generados se seleccionaron, corrigieron y adaptaron mediante un proceso iterativo.
- La arquitectura, integración, comportamiento de la interfaz y experiencia final fueron desarrollados y revisados dentro del proyecto.
- Los recursos creados con IA se presentan de forma transparente en este README.

### Arquitectura de AI Lab

| Archivo | Responsabilidad |
| --- | --- |
| `AiLabActivationButton.tsx` | Activa la experiencia desde el portfolio principal. |
| `AiLabTransitionOverlay.tsx` | Gestiona el vídeo, sonido, progreso, salto y final de la cinemática. |
| `AiLabEntry.tsx` | Coordina el estado general, las secciones, los paneles y la conexión con la escena 3D. |
| `AiLabEntry.module.scss` | Define el escenario visual, las animaciones, los paneles y el comportamiento responsive. |
| `AiLabScene3D.tsx` | Construye la escena WebGL, carga los modelos y controla cámara, luces e interacciones. |
| `AiLabSceneBoundary.tsx` | Aísla posibles errores de WebGL para proteger el resto de la interfaz. |
| `AiLabLoadingFallback.tsx` | Muestra el estado de carga mientras se descarga el módulo. |
| `AiLabErrorBoundary.tsx` | Proporciona una salida segura si falla la experiencia completa. |

### Estructura principal

```text
public/
├── models/
│   └── ai-lab/                 # Modelos GLB y texturas del escenario
├── projects/                   # Imágenes de proyectos
├── videos/                     # Cinemáticas desktop, tablet y móvil
└── EmadCVES.pdf / EmadCVEN.pdf

src/
├── components/                 # Portfolio principal
│   ├── core/                   # Header y Footer
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Experience.tsx
├── data/
│   └── projects.ts
├── features/
│   └── ai-lab/
│       ├── activation/         # Entrada a AI Lab
│       ├── transition/         # Cinemática responsive
│       ├── scene/              # Escena Three.js
│       ├── AiLabEntry.tsx
│       ├── AiLabLoadingFallback.tsx
│       └── AiLabErrorBoundary.tsx
├── i18n/
│   └── translations.ts
├── styles/
├── App.tsx
└── main.tsx
```

### Instalación y ejecución

Requisitos: Node.js 22 y npm.

```bash
git clone https://github.com/Ematius/PorfolioEmad.git
cd PorfolioEmad
npm install
npm run dev
```

Comandos disponibles:

```bash
npm run dev       # Servidor local
npm run build     # Compilación de producción
npm run preview   # Vista previa del build
npm run lint      # Análisis estático
npm run test      # Pruebas con Vitest
```

### Objetivo

Este proyecto representa tanto la consolidación de mis conocimientos en el ecosistema React como una exploración práctica del papel que puede tener la inteligencia artificial dentro de un flujo de desarrollo real.

Más que añadir IA por estética, el objetivo fue aprender a combinar herramientas generativas, software 3D y desarrollo frontend sin perder el control creativo ni técnico del resultado.

---

## 🇬🇧 English

### About the project

This is my second personal portfolio as a web developer. It was created after completing training focused on React, Vite and TypeScript, with the goal of consolidating my knowledge and presenting my experience and projects through a modern, responsive and bilingual application.

The first version of the portfolio was designed and developed by hand, before today's artificial intelligence tools reached their current capabilities. The result worked well, but it led me to ask a question: **how far could I take the same project by introducing AI as a creative and technical tool?**

That curiosity became **AI Lab**: a second experience inside the same portfolio, featuring a cinematic transition and an interactive 3D space environment that provides access to Projects, Journey and Contact.

The idea, AI Lab concept, narrative, interaction choices, visual direction and final decisions are original and reflect my own vision for the project. Visual designs, references, videos and models were developed with generative AI tools guided through my prompts, tests and corrections. These assets were then prepared, integrated and programmed into the application.

### Two experiences in one portfolio

#### Main portfolio

- Professional introduction and technology stack.
- Dynamic projects generated from a centralized data source.
- Professional experience and downloadable CV in Spanish and English.
- Contact form integrated with Netlify Forms.
- Language and visual theme switching.
- Responsive layout for desktop, tablet and mobile.

#### AI Lab

- Activation control integrated into the main portfolio.
- Cinematic transition with video and sound.
- Dedicated videos for desktop, portrait tablet and mobile.
- Interactive WebGL scene with three 3D systems.
- Animated camera, lighting, particles and ambient movement.
- Hover, click and keyboard interactions.
- Projects, Journey and Contact panels connected to the portfolio's real content.
- Lazy loading with `lazy` and `Suspense`.
- Error boundaries that isolate React or WebGL failures.
- Support for `prefers-reduced-motion`.
- Device-specific camera, scale and object positioning.

### Main technologies

| Area | Tools |
| --- | --- |
| Frontend | React, TypeScript, React Router |
| Development environment | Vite |
| Styling | SCSS Modules, responsive design |
| 3D and WebGL | Three.js, React Three Fiber, Drei |
| Models and assets | GLB/GLTF, WebP, MP4 video |
| Internationalization | Custom Spanish and English i18n system |
| Quality | ESLint, Vitest, Testing Library |
| Deployment | Netlify, continuous deployment from GitHub |

### AI, 3D design and creative workflow

AI Lab was not produced through a single automated instruction. It was an iterative process combining creative direction, assisted generation, asset editing, programming and testing.

| Tool | Use in the project |
| --- | --- |
| **ChatGPT** | Prompt development, concept exploration, workflow planning, tool orchestration, programming support, debugging and responsive review. |
| **ChatGPT Images** | Creation and iteration of visual references for planets, satellites, monoliths and other art-direction elements. |
| **Meshy AI** | Generation and conversion of the 3D figures and assets used as the basis for the scene models. |
| **Blender** | Inspection, preparation and adjustment of 3D models before web integration, including GLB export when required. |
| **BytePlus Lumina** | Generation of the cinematic AI Lab entry transition, including versions adapted to different screen ratios. |
| **Three.js** | WebGL rendering, materials, lighting, camera behavior and 3D animation in the browser. |
| **React Three Fiber** | Declarative Three.js integration in React and synchronization between the 3D scene and interface state. |
| **Drei** | GLTF model and texture loading, together with utilities for the Three.js scene. |

The workflow was:

1. Define the idea, narrative and visual direction.
2. Create references through image generation and iterative prompting.
3. Generate models with Meshy AI.
4. Inspect and prepare assets in Blender.
5. Integrate and program the experience with React, TypeScript and Three.js.
6. Create the cinematic transition with BytePlus Lumina.
7. Complete responsive adjustments, optimization, accessibility work, debugging and final testing.

### Authorship and responsible AI use

Artificial intelligence was used as a set of production and assistance tools, not as a replacement for authorship.

- The AI Lab idea and its integration into the portfolio are my own.
- I defined the creative direction, prompts and design decisions.
- Generated outputs were selected, corrected and adapted through an iterative process.
- The architecture, integration, interface behavior and final experience were developed and reviewed within the project.
- AI-created assets are disclosed transparently in this README.

### AI Lab architecture

| File | Responsibility |
| --- | --- |
| `AiLabActivationButton.tsx` | Activates the experience from the main portfolio. |
| `AiLabTransitionOverlay.tsx` | Manages video, sound, progress, skipping and cinematic completion. |
| `AiLabEntry.tsx` | Coordinates global state, sections, panels and the connection to the 3D scene. |
| `AiLabEntry.module.scss` | Defines the visual environment, animations, panels and responsive behavior. |
| `AiLabScene3D.tsx` | Builds the WebGL scene, loads models and controls the camera, lights and interactions. |
| `AiLabSceneBoundary.tsx` | Isolates potential WebGL errors to protect the rest of the interface. |
| `AiLabLoadingFallback.tsx` | Displays loading state while the module is downloaded. |
| `AiLabErrorBoundary.tsx` | Provides a safe exit if the complete experience fails. |

### Main structure

```text
public/
├── models/
│   └── ai-lab/                 # GLB models and scene textures
├── projects/                   # Project images
├── videos/                     # Desktop, tablet and mobile cinematics
└── EmadCVES.pdf / EmadCVEN.pdf

src/
├── components/                 # Main portfolio
│   ├── core/                   # Header and Footer
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Experience.tsx
├── data/
│   └── projects.ts
├── features/
│   └── ai-lab/
│       ├── activation/         # AI Lab entry
│       ├── transition/         # Responsive cinematic
│       ├── scene/              # Three.js scene
│       ├── AiLabEntry.tsx
│       ├── AiLabLoadingFallback.tsx
│       └── AiLabErrorBoundary.tsx
├── i18n/
│   └── translations.ts
├── styles/
├── App.tsx
└── main.tsx
```

### Installation and local development

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/Ematius/PorfolioEmad.git
cd PorfolioEmad
npm install
npm run dev
```

Available commands:

```bash
npm run dev       # Local development server
npm run build     # Production build
npm run preview   # Build preview
npm run lint      # Static analysis
npm run test      # Vitest test suite
```

### Project goal

This project represents both the consolidation of my React ecosystem knowledge and a practical exploration of the role artificial intelligence can play in a real development workflow.

Rather than adding AI purely for visual effect, the goal was to learn how to combine generative tools, 3D software and frontend development without losing creative or technical control of the final result.
