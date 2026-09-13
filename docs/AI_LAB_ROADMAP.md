# AI Lab — Development Roadmap

## General rule

Work on one phase at a time. Do not begin the next phase until the current phase has been reviewed and approved.

Each phase ends with:

- A working result.
- Quality checks.
- A plain-language explanation.
- Updated decisions when necessary.
- A commit only when explicitly requested.

## Phase 0 — Repository audit and protection

### Objective

Understand the current portfolio and identify the safest integration strategy.

### Tasks

- Read all AI Lab documentation.
- Inspect the complete repository.
- Record the current folder structure.
- Identify the application entry point.
- Identify navigation and scrolling behavior.
- Identify theme and i18n architecture.
- Identify current dependencies and scripts.
- Identify Netlify routing requirements.
- Identify existing accessibility or performance risks.
- Propose two ways to expose `/ai-lab`.

### Restrictions

- Do not modify code.
- Do not install dependencies.
- Do not reorganize existing folders.

### Completion criteria

- The user receives a clear audit.
- The integration strategy is approved.
- Any necessary decision is added to `DECISIONS.md`.

## Phase 1 — AI Lab foundation

### Objective

Create the minimum architecture connecting both experiences.

### Tasks

- Add the AI Lab feature folder.
- Add the approved `/ai-lab` navigation mechanism.
- Add a placeholder AI Lab screen.
- Add a visible return-to-original control.
- Add lazy loading.
- Add loading and failure states.
- Preserve the existing page and navigation.

### Completion criteria

- `/` behaves as before.
- AI Lab can be opened intentionally.
- AI Lab can return safely to `/`.
- A failed AI Lab load does not break the original portfolio.
- AI Lab code is excluded from the original initial bundle when technically possible.

## Phase 2 — Activation button and transition state machine

### Objective

Validate the complete experience flow without complex visual effects.

### Tasks

- Add the **ACTIVATE AI LAB** button.
- Add Spanish and English translations.
- Implement the approved transition state model.
- Add a simple temporary transition.
- Add **Skip animation**.
- Add reduced-motion behavior.
- Prevent repeated activation during transition.
- Restore the original page if navigation fails.

### Completion criteria

- Every state has a defined entry and exit.
- The transition cannot become permanently stuck.
- Keyboard and touch activation work.
- Skip works at every safe point.
- Reduced motion avoids distortion and intense camera movement.

## Phase 3 — Singularity prototype

### Objective

Create a visual proof of concept for the black-hole transformation.

### Tasks

- Compare DOM-fragment animation and canvas/WebGL capture approaches.
- Prototype interface bending.
- Prototype fragment orbit and absorption.
- Prototype blackout and explosion.
- Measure desktop and mobile performance.
- Select the final implementation approach.

### Restrictions

- Do not add final 3D project assets.
- Do not build the complete universe.
- Do not remove the simple fallback transition.

### Completion criteria

- The effect is visually convincing on a representative desktop.
- A safe mobile version exists.
- The original interface is restored when returning.
- The chosen technique and rejected alternatives are documented.

## Phase 4 — Central 3D universe

### Objective

Build the stable hub that appears after the explosion.

### Tasks

- Create the cosmic environment.
- Create the central singularity.
- Add the Emad.dev monolith placeholder.
- Add placeholder project worlds.
- Add controlled camera movement.
- Add persistent HTML navigation.
- Add WebGL failure fallback.
- Pause rendering when the experience is hidden.

### Completion criteria

- The visitor understands where they arrived.
- Every destination is visible or directly accessible.
- No videogame controls are required.
- The hub is usable with keyboard, mouse and touch.
- Performance is acceptable with placeholder assets.

## Phase 5 — 3D asset pipeline

### Objective

Define and validate the process for producing web-ready AI-generated assets.

### Tasks

- Select one pilot asset: the Emad.dev monolith.
- Create concept references.
- Generate the model with Meshy.
- Inspect topology and textures.
- Clean and optimize in Blender when necessary.
- Export a compressed GLB.
- Test scale, lighting and materials in the browser.
- Record prompt, source, license, polygon count and file size.
- Define naming and versioning conventions.

### Completion criteria

- The pilot asset is visually consistent with the universe.
- The model has an approved size and polygon budget.
- The asset works on desktop and the reduced mobile profile.
- The pipeline is documented before generating the remaining assets.

## Phase 6 — Project worlds

### Objective

Create one meaningful environment for each real project.

### Recommended order

1. JS Quiz — clearer technical architecture experiment.
2. Temple of Fight — strongest motion and personal identity.
3. Laboratorio GeoControl — real client and geological environment.
4. First Portfolio — origin archive and retrospective.

### Tasks for each world

- Define the narrative purpose.
- Select one hero object.
- Define the information architecture.
- Create placeholder geometry first.
- Generate and optimize final assets.
- Add project description, decisions and stack.
- Add live and repository links when available.
- Verify mobile and reduced-motion behavior.
- Lazy-load the world independently.

### Completion criteria

- Every effect supports real project information.
- No invented functionality is presented.
- Each world can be entered and exited safely.
- Unvisited worlds are not loaded unnecessarily.

## Phase 7 — Skills, journey, CV and contact

### Objective

Complete the professional information inside the universe.

### Tasks

- Build skill constellations linked to real evidence.
- Build the professional journey as a spatial timeline.
- Add Spanish and English CV downloads.
- Build the contact beacon around an accessible HTML form.
- Add LinkedIn and GitHub access.
- Keep direct navigation available.

### Completion criteria

- Professional information remains readable and accurate.
- Forms expose accessible success and error states.
- CV downloads do not depend on WebGL.
- Skills do not exaggerate Emad's level of experience.

## Phase 8 — AI creation log

### Objective

Explain how the experience was created and which decisions belong to Emad.

### Tasks

- Document creative direction.
- Document Claude's development role.
- Document Meshy-generated assets.
- Record prompts that are useful to understand the process.
- Explain manual review and corrections.
- Explain accessibility and performance decisions.
- List tools considered and rejected.

### Completion criteria

- Attribution is honest and easy to find.
- The creation log reads as a professional case study.
- No private prompts, secrets or credentials are exposed.

## Phase 9 — Optimization and validation

### Objective

Make the experience reliable enough to publish.

### Tasks

- Measure bundle size.
- Measure model and texture sizes.
- Test loading on a slower connection.
- Test representative desktop and mobile devices.
- Test light and dark original themes.
- Test Spanish and English content.
- Test keyboard navigation.
- Test reduced motion.
- Test WebGL unavailable or failed.
- Run Lighthouse and browser performance profiling.
- Remove unused dependencies and assets.

### Completion criteria

- The original portfolio has no material regression.
- AI Lab has documented performance limits.
- No critical accessibility or navigation issue remains.
- All production checks succeed.

## Phase 10 — Publication

### Objective

Publish the feature safely without losing the stable portfolio.

### Tasks

- Review the final diff.
- Build a deployment preview.
- Test the preview URLs.
- Verify Netlify routing and asset caching.
- Confirm analytics behavior if analytics exist.
- Prepare rollback instructions.
- Merge and deploy only after explicit approval.

### Completion criteria

- The original portfolio remains the default entry.
- `/ai-lab` works from direct navigation and page refresh.
- A rollback path exists.
- The deployed version matches the approved preview.

