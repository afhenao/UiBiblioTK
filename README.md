# bibliotk-ui

Componentes React de BiblioTK con su CSS ya compilado (`bibliotk-ui/styles.css`) y el tema de Tailwind CSS 4 (`bibliotk-ui/theme.css`).

## Uso en una app (Vite + React 19)

1. Instala la librería:

   ```bash
   npm install bibliotk-ui
   ```

2. Crea la hoja de la app y enlázala desde `index.html` (`<link rel="stylesheet" href="/src/app/styles/globals.css" />`):

   ```css
   @layer theme, base, components, utilities;
   @import "@fontsource-variable/bricolage-grotesque/opsz.css";
   @import "@fontsource-variable/geist";
   @import "bibliotk-ui/styles.css";

   /* Solo si la app usa sus propias utilidades de Tailwind */
   @import "tailwindcss/theme.css" layer(theme);
   @import "tailwindcss/utilities.css" layer(utilities);
   @import "bibliotk-ui/theme.css";
   ```

3. Fija `IconContext` de Phosphor (`weight: "bold"`, `size: 18`) e importa cada ícono por separado (`@phosphor-icons/react/SignOut`).

4. Importa desde la raíz del paquete:

   ```jsx
   import { Button, DonutChart, PanelLayout } from "bibliotk-ui";
   ```

La lista completa de componentes y las reglas del sistema de diseño están en `CLAUDE.md`.

## Desarrollo

```bash
npm install
npm run build
npm run check
```
