# @bibliotk/ui

Componentes React y tema de Tailwind CSS 4 de BiblioTK.

## Uso en una app (Vite + React 19 + Tailwind 4)

1. Coloca esta carpeta al lado de la app y añade la dependencia:

   ```json
   "@bibliotk/ui": "file:../UiBiblioTK"
   ```

2. Importa el tema después de Tailwind:

   ```css
   @import "tailwindcss";
   @import "@bibliotk/ui/theme.css";
   ```

3. Deduplica las dependencias compartidas en `vite.config.js`:

   ```js
   resolve: {
   	dedupe: ["react", "react-dom", "react-router", "react-router-dom", "@phosphor-icons/react"],
   },
   ```

4. Carga las fuentes `@fontsource-variable/bricolage-grotesque/opsz.css` y `@fontsource-variable/geist`, y fija `IconContext` de Phosphor (`weight: "bold"`, `size: 18`).

5. Importa desde la raíz del paquete:

   ```jsx
   import { Button, DonutChart, PanelLayout } from "@bibliotk/ui";
   ```

La lista completa de componentes y las reglas del sistema de diseño están en `CLAUDE.md`.

## Desarrollo

```bash
npm install
npm run check
```
