# CLAUDE.md

## 1. Project identity

This repository contains the professional portfolio of Emad Kadyear.

The existing portfolio was designed and developed manually by Emad. It is the stable, professional and default experience. It must remain accessible and functional at all times.

The project will add a second, experimental experience named **AI Lab**. AI Lab is an extravagant 3D universe created with AI-assisted development and modern creative technologies.

The contrast between both experiences is intentional:

- **Original Portfolio:** handcrafted, clear, professional and fast.
- **AI Lab:** experimental, cinematic, interactive and openly created with AI assistance.

## 2. Current project context

The current portfolio uses:

- React.
- Vite.
- TypeScript.
- SCSS Modules.
- Internationalization in Spanish and English.
- Light and dark themes.
- Deployment on Netlify.

Before relying on these assumptions, inspect the repository and report any difference.

The current public portfolio contains:

- Hero and professional introduction.
- Skills.
- Projects.
- Work experience.
- Contact form.
- CV downloads in Spanish and English.
- LinkedIn and GitHub links.

The projects currently represented are:

1. First Portfolio — Angular 19 and GSAP.
2. Temple of Fight — Angular 19 and GSAP.
3. Laboratorio GeoControl — WordPress internship project.
4. JS Quiz — Angular 19, NestJS and MySQL.

Do not invent, rename or attribute other projects to Emad.

## 3. Mandatory documentation

Before proposing or implementing work related to AI Lab, read:

- `docs/AI_LAB_VISION.md`
- `docs/AI_LAB_ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ASSET_INVENTORY.md`

If these documents conflict, use this priority:

1. The user's latest explicit instruction.
2. `docs/DECISIONS.md`.
3. `docs/AI_LAB_VISION.md`.
4. `docs/AI_LAB_ROADMAP.md`.
5. `docs/ASSET_INVENTORY.md`.

Never silently resolve a major conflict. Explain it and request a decision.

## 4. Non-negotiable rules

- Preserve the original portfolio as the default experience.
- Do not redesign or refactor the original portfolio without explicit approval.
- AI Lab must be activated voluntarily through a visible button.
- AI Lab must provide an obvious way to return to the original portfolio.
- CV, projects and contact information must remain easy to access.
- AI Lab must be loaded lazily and must not damage the initial performance of the original portfolio.
- Do not autoplay sound.
- Respect `prefers-reduced-motion`.
- Provide a reduced experience for mobile devices and low-performance hardware.
- Keep Spanish and English translations synchronized.
- Do not hardcode visible text inside visual components when the project uses i18n.
- Code, filenames, identifiers and comments must be written in English.
- Use descriptive names and small components with clear responsibilities.
- Do not install a dependency without first explaining why it is needed and receiving approval.
- Do not commit, push, merge or deploy unless the user explicitly requests it.

## 5. Target experience

The intended user journey is:

```text
Original Portfolio
        ↓
Activate AI Lab
        ↓
Destabilization
        ↓
Singularity absorption
        ↓
Dark pause
        ↓
Cosmic explosion
        ↓
AI Lab universe
```

The target public locations are:

- `/` — original portfolio.
- `/ai-lab` — experimental universe.

The repository must be inspected before selecting or adding a routing solution. Do not install React Router automatically if the current project does not need it. Present the safest alternatives first.

The transformation should eventually follow a state model similar to:

```text
idle
  → destabilizing
  → fragmenting
  → singularity
  → blackout
  → explosion
  → loading
  → aiUniverse
```

The first implementation must use a simple placeholder transition. Complex shaders and 3D assets are introduced only after navigation, recovery and accessibility work correctly.

## 6. Intended technical direction

Technologies that may be evaluated:

- Three.js.
- React Three Fiber.
- Drei.
- GSAP.
- Custom GLSL shaders.
- Postprocessing effects.
- Meshy-generated GLB assets.
- Blender for cleanup and optimization.
- Rapier for physics, only if real physics adds value.
- Theatre.js for cinematic sequencing, only if GSAP is insufficient.
- Rive for interface animation, only if CSS or SVG is insufficient.

This list is not an installation request. Prefer the smallest viable stack.

## 7. Working method

For every development phase:

1. Read the relevant documentation.
2. Inspect the existing implementation.
3. Explain the proposed change and affected files.
4. Identify risks and alternatives.
5. Wait for approval if the change affects architecture, dependencies or the original portfolio.
6. Implement only the approved scope.
7. Run the relevant quality checks.
8. Explain what changed in plain language.
9. Update `docs/DECISIONS.md` when a decision is approved.
10. Update `docs/ASSET_INVENTORY.md` when an asset is created, replaced or removed.
11. Stop before beginning the next phase.

## 8. Quality gates

After each implementation phase, run the scripts that actually exist in `package.json`. At minimum, verify when available:

- TypeScript compilation.
- Linting.
- Unit tests.
- Production build.
- Original portfolio navigation.
- Spanish and English versions.
- Light and dark themes.
- Mobile layout.
- Keyboard navigation.
- Reduced-motion behavior.

Never report a check as successful unless it was executed successfully.

## 9. Performance expectations

- The original portfolio should not download the complete 3D universe during its initial load.
- Heavy assets must be loaded only when AI Lab is requested or when an explicitly approved preloading strategy is used.
- Project worlds should be loaded independently.
- Use compressed, web-ready textures and models.
- Dispose of Three.js geometries, materials, textures and event listeners correctly.
- Pause expensive rendering when AI Lab is not visible.
- Avoid unnecessary physics, postprocessing and permanent particle systems.

Performance budgets will be refined after the repository audit and the first prototype.

## 10. Transparency about AI

AI usage must be communicated honestly and positively.

Suggested attribution:

```text
Original Portfolio
Designed and developed manually by Emad Kadyear.

AI Lab
Concept and creative direction by Emad Kadyear.
Development assisted by Claude.
Selected 3D assets generated with Meshy and optimized for the web.
```

Do not describe AI Lab as completely handmade. Do not imply that AI made the creative decisions independently.

## 11. First task for Claude

When first receiving these files, do not implement AI Lab.

Perform a read-only audit and provide:

1. The real repository structure.
2. The current application entry point.
3. Navigation and scrolling architecture.
4. Styling and theme architecture.
5. Internationalization architecture.
6. Current build and quality scripts.
7. Recommended integration point for the AI Lab button.
8. Two safe alternatives for exposing `/ai-lab`.
9. A proposed feature-folder structure.
10. Risks affecting performance, mobile behavior or deployment.

Wait for approval before editing code or installing dependencies.
