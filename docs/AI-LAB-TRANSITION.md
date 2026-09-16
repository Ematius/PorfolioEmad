# Transición de entrada a AI Lab

## Flujo actual

1. El botón fijo `ACTIVAR AI LAB` llama a la transición desde cualquier punto del portafolio.
2. La página vuelve inmediatamente al inicio y abre un vídeo a pantalla completa.
3. El vídeo intenta reproducirse con sonido. Si el navegador bloquea el audio automático, continúa silenciado y ofrece el botón `Activar sonido`.
4. La persona puede silenciar, activar el sonido, pulsar `Saltar transición` o usar `Escape`.
5. Al finalizar el vídeo se navega a `/ai-lab`.
6. Si el vídeo falla, se entra directamente a `/ai-lab` para que la navegación nunca quede bloqueada.
7. Con `prefers-reduced-motion: reduce` se omite el vídeo y se entra directamente.

## Sustituir el vídeo

Reemplazar este archivo manteniendo el mismo nombre:

`public/videos/ai-lab-transition.mp4`

Formato recomendado para máxima compatibilidad web:

- Contenedor: MP4
- Vídeo: H.264 Main o Baseline, `yuv420p`
- Audio: AAC-LC, 48 kHz
- Relación: 16:9
- Resolución final recomendada: 1920×1080
- Duración actual: 10 segundos

Si la duración cambia, actualizar también la duración de `transition-progress` en:

`src/features/ai-lab/transition/AiLabTransitionOverlay.module.scss`

## Archivos principales

- `src/features/ai-lab/transition/AiLabTransitionOverlay.tsx`
- `src/features/ai-lab/transition/AiLabTransitionOverlay.module.scss`
- `src/App.tsx`
- `src/features/ai-lab/AiLabEntry.tsx`
- `src/features/ai-lab/AiLabEntry.module.scss`
