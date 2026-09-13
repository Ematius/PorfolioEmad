# AI Lab — Asset Inventory

## Purpose

This document tracks every external, generated and procedural asset used by AI Lab.

Every asset must have:

- A clear narrative purpose.
- A known source or generation tool.
- A recorded license or usage condition.
- A web-optimized format.
- A performance budget.
- A mobile strategy.
- A status.

Do not add an asset only because it looks impressive.

## Status values

- Idea.
- Reference needed.
- Generating.
- Cleanup.
- Optimizing.
- Testing.
- Approved.
- Rejected.

## Core and transition assets

| ID | Asset | Purpose | Type | Suggested tool | Delivery format | Priority | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CORE-001 | Central singularity | Visual and narrative center | Procedural shader | Three.js / GLSL | Code | Critical | Idea | Must have reduced-motion fallback |
| CORE-002 | Accretion disk | Define the black hole and explosion origin | Procedural geometry and shader | React Three Fiber / GLSL | Code | Critical | Idea | Avoid excessively bright flashes |
| CORE-003 | Star field | Give depth and scale | Procedural particles | Three.js | Code | High | Idea | Adaptive particle count |
| CORE-004 | Emad.dev monolith | Central identity and navigation anchor | 3D model | Meshy + Blender | GLB | High | Idea | First pilot asset for the pipeline |
| CORE-005 | Original interface fragments | Connect both experiences visually | DOM fragments or generated planes | GSAP / WebGL | Runtime | Critical | Idea | Must use the real current interface |
| CORE-006 | Gravitational distortion | Bend the portfolio toward the singularity | Screen-space shader | GLSL | Code | Critical | Idea | Prototype before final implementation |
| CORE-007 | Explosion wave | Reveal the AI universe | Shader and particles | GLSL / Three.js | Code | High | Idea | No rapid repeated flashing |
| CORE-008 | Loading symbol | Cover asynchronous AI Lab loading | UI animation | CSS / Rive | SVG or code | Medium | Idea | Must include accessible text |

## Project-world assets

| ID | Project | Asset | Narrative purpose | Suggested tool | Format | Load strategy | Status |
|---|---|---|---|---|---|---|---|
| PRJ-001 | First Portfolio | Orbital archive | Preserve the origin of Emad.dev | Meshy + Blender | GLB | On world entry | Idea |
| PRJ-002 | First Portfolio | Interface relic panels | Show fragments of the former design | Existing screenshots / geometry | WebP + GLB | On world entry | Idea |
| PRJ-003 | Temple of Fight | Ceremonial combat gloves | Connect sport, motion and development | Meshy + Blender | GLB | On world entry | Idea |
| PRJ-004 | Temple of Fight | Eclipsed floating temple | Create the project environment | Meshy or modular Blender scene | GLB | On world entry | Idea |
| PRJ-005 | Temple of Fight | Energy impact effect | Represent GSAP motion work | Procedural particles | Code | On world entry | Idea |
| PRJ-006 | Laboratorio GeoControl | Geological core sample | Represent terrain analysis | Meshy + Blender | GLB | On world entry | Idea |
| PRJ-007 | Laboratorio GeoControl | Stratified planet | Organize the case study in layers | Procedural geometry + textures | GLB / code | On world entry | Idea |
| PRJ-008 | Laboratorio GeoControl | Technical instruments | Add professional context | Meshy | GLB | Optional detail load | Idea |
| PRJ-009 | JS Quiz | Logic cube | Central symbol for the application | Meshy or procedural geometry | GLB / code | On world entry | Idea |
| PRJ-010 | JS Quiz | Frontend-backend-data nodes | Explain Angular, NestJS and MySQL | Procedural geometry | Code | On world entry | Idea |
| PRJ-011 | JS Quiz | Question signals | Visualize questions moving through the system | Particles and text | Code / HTML | On world entry | Idea |

## Professional-information assets

| ID | Asset | Purpose | Suggested tool | Format | Status | Accessibility requirement |
|---|---|---|---|---|---|---|
| INFO-001 | Skill constellations | Organize verified technologies | Three.js | Code | Idea | Equivalent HTML list |
| INFO-002 | Professional journey trail | Represent career progression | Three.js / GSAP | Code | Idea | Equivalent semantic timeline |
| INFO-003 | CV data capsule | Visual anchor for CV downloads | Meshy | GLB | Idea | Real HTML download links |
| INFO-004 | Contact beacon | Visual anchor for communication | Meshy or procedural geometry | GLB / code | Idea | Accessible HTML form |
| INFO-005 | GitHub satellite | Direct portfolio link | Procedural geometry | Code | Idea | Labeled external link |
| INFO-006 | LinkedIn satellite | Direct professional link | Procedural geometry | Code | Idea | Labeled external link |

## Optional experimental assets

These items are not approved for production.

| ID | Asset | Experiment | Main risk | Status |
|---|---|---|---|---|
| EXP-001 | Stylized Emad bust | Image-to-3D representation | Uncanny facial result and file size | Idea |
| EXP-002 | Cosmic guardian | AI-generated guide character | May distract from professional content | Idea |
| EXP-003 | Generative ambience | Adaptive soundscape | Intrusive audio and download size | Idea |
| EXP-004 | Device-tilt camera | Mobile parallax | Motion sickness and permission behavior | Idea |
| EXP-005 | WebXR mode | Experimental immersive viewing | Limited device support and scope expansion | Idea |

## Asset production record

Complete this block for every approved generated asset:

```md
### ASSET-ID — Asset name

- Purpose:
- World or section:
- Created by:
- Generation tool and model version:
- Prompt or source reference:
- Generation date:
- License or usage terms:
- Original format:
- Final format:
- Polygon count:
- Texture dimensions:
- Original file size:
- Optimized file size:
- Optimization performed:
- Desktop profile:
- Mobile profile:
- Fallback:
- Current version:
- Status:
- Notes:
```

## Naming convention

Use lowercase kebab-case filenames:

```text
emad-monolith-v01.glb
temple-combat-gloves-v01.glb
geocontrol-core-sample-v01.glb
js-quiz-logic-core-v01.glb
```

Do not overwrite an approved source file. Create a new version and update this inventory.

## Initial performance targets

These are starting targets and must be revised after real testing:

- Central hub initial assets: ideally no more than 4 MB compressed.
- Individual hero GLB: ideally no more than 2 MB compressed.
- Secondary asset: ideally no more than 750 KB compressed.
- Textures: prefer WebP, AVIF, KTX2 or another approved web-ready format.
- Avoid 4K textures unless visual testing proves they are necessary.
- Use Draco or Meshopt compression when it improves real delivery without unacceptable decoding cost.
- Create reduced mobile assets or levels of detail for complex objects.

File size alone does not determine approval. Measure loading, decoding, GPU memory and rendering cost.

