# UiBiblioTK — Librería de interfaz (`bibliotk-ui` en npm)

Parte del sistema BiblioTK (ver `../CLAUDE.md`). Componentes React compartidos por los cuatro fronts, **con su CSS ya compilado**, más el tema de Tailwind CSS 4 para que cada app genere sus utilidades con los mismos tokens. Se publica en npm como `bibliotk-ui` y de ahí la instalan los fronts.

- **Build:** `npm run build` → `dist/index.js` (esbuild: JSX compilado, ESM, dependencias externas) y `dist/bibliotk-ui.css` (Tailwind CLI, minificado). `prepack` lo corre solo antes de `npm pack`/`npm publish`. `dist/` no va a git.
- **Mientras se trabaja:** `npm run watch:js` y `npm run watch:css` (en dos terminales).
- **Lint/formato:** Biome (`npm run check`). Tabs y comillas dobles. Prohíbe importar `@phosphor-icons/react` entero (ver "Íconos").
- **Qué se publica** (`files`): `dist/` y `src/styles/theme.css`. Comprobarlo con `npm pack --dry-run`.
- **Peer dependencies:** `react` 19, `react-dom` 19, `react-router-dom` 7 (solo `PanelLayout`), `@phosphor-icons/react` ≥ 2.1.10 y, opcional, `tailwindcss` 4 (solo para usar `theme.css`).

## Cómo se consume

1. `"bibliotk-ui": "^0.2.0"` en la app.
2. Una sola hoja en la app, **enlazada desde `index.html`** (`<link rel="stylesheet" href="/src/app/styles/globals.css" />`), nunca importada desde JS:
   ```css
   @layer theme, base, components, utilities;
   @import "@fontsource-variable/bricolage-grotesque/opsz.css";
   @import "@fontsource-variable/geist";
   @import "bibliotk-ui/styles.css";                  /* reset + tokens + base + componentes, ya compilado */
   @import "tailwindcss/theme.css" layer(theme);      /* Tailwind solo para las utilidades de la app, */
   @import "tailwindcss/utilities.css" layer(utilities); /* sin preflight: ya viene en la hoja de la librería */
   @import "bibliotk-ui/theme.css";
   ```
   Tailwind de la app ya **no** lee el código de la librería (no hay `@source`).
3. En `main.jsx`: `IconContext` desde `@phosphor-icons/react/dist/lib/context` con `weight: "bold"` y `size: 18`.
4. `resolve.dedupe` de React, router e íconos en `vite.config.js` (solo hace falta si se enlaza la librería con `file:`, pero no estorba).
5. Importar siempre desde la raíz: `import { Button, cn } from "bibliotk-ui";`.

## Cómo está hecho el CSS

- Cada componente tiene su `.css` al lado del `.jsx` (`Button.jsx` + `Button.css`) con **clases semánticas** con prefijo `btk-` (BEM: `btk-button`, `btk-button--primary`, `btk-button__icon`). El JSX solo pone nombres de clase; los estilos no viven en el JS.
- Los `.css` usan `@apply` con las utilidades de Tailwind y los tokens del tema; `src/styles/index.css` los junta con el preflight y `base.css`, y el CLI los compila a CSS plano.
- Todo va en la capa `components`, así las utilidades de la app (capa `utilities`) siempre ganan: `className="mt-6 w-full"` en un `Button` funciona sin `!important`.
- `theme.css` se importa con `theme(static)`: la hoja compilada trae **todos** los tokens como variables CSS (`var(--color-role-admin)` existe aunque ningún componente lo use).
- Los valores que dependen de datos llegan como variables en `style` (`--btk-donut-color`, `--btk-donut-delay`), no como estilos en línea.
- Las clases `btk-*` son parte de la API pública: una app puede ajustar un componente con CSS propio (sin capa, gana sobre `components`), como hace el front del lector con `.btk-panel__header`.

## Íconos

Siempre un import por ícono: `import { SignOut } from "@phosphor-icons/react/SignOut";`. El paquete completo (`@phosphor-icons/react`) son ~6 MB que Vite carga y evalúa en desarrollo en cada página; era lo que más frenaba el arranque de los fronts. Biome (acá) y ESLint (en los fronts) lo marcan como error.

## Qué exporta (`src/index.js`)

| Export | Archivo | Notas |
|---|---|---|
| `AuthLayout`, `authHeadlineClasses` | `components/layout/AuthLayout.jsx` | Pantalla partida de login y registro. `width`: `narrow` o `wide` |
| `PanelLayout` | `components/layout/PanelLayout.jsx` | Barra superior. Props: `navItems` `[{ to, label, end }]`, `homePath`, `navLabel`, `userLabel`, `onLogout`. La sección activa se marca con `aria-current`; si no caben, las secciones se deslizan de lado |
| `ReaderLayout` | `components/layout/ReaderLayout.jsx` | Cabecera simple con logo y cerrar sesión |
| `ErrorBoundary` | `components/layout/ErrorBoundary.jsx` | Pantalla "Algo salió mal" con botón Recargar |
| `Button`, `buttonClasses` | `components/ui/Button.jsx` | Variantes `primary`, `accent`, `outline`, `ghost` y `danger`; tamaños `sm`, `md` y `lg`; `loading` y `trailingIcon`. `buttonClasses()` da estilo de botón a un `Link` |
| `TextField`, `inputClasses` | `components/ui/TextField.jsx` | Etiqueta arriba; `error` o `hint` debajo, enlazados con `aria-describedby`. `inputClasses` sirve para `<select>` |
| `PasswordField` | `components/ui/PasswordField.jsx` | `TextField` con botón para mostrar u ocultar |
| `Checkbox`, `Alert`, `Logo` | `components/ui/` | `Alert` tiene los tonos `error`, `info` y `success` |
| `CoverImage` | `components/ui/CoverImage.jsx` | Portada de un material: prueba `imagenUrl` (Cloudinary optimizado con `f_auto,q_auto` y el `ancho` pedido) y si falla `imagenLocal`; sin ninguna, superficie verde con el título. `compacta` para miniaturas. Llena el contenedor |
| `Dialog` | `components/ui/Dialog.jsx` | `<dialog>` nativo en modo modal. Props: `open`, `onClose`, `title`, `description`, `icon`, `tone` (`neutral` o `danger`) y `dismissible` |
| `DonutChart` | `components/data/DonutChart.jsx` | Dona con leyenda interactiva. Props: `segments` `[{ key, label, value, color }]`, `totalLabel`, `formatValue` y `formatShare` |
| `cn` | `utils/cn.js` | Une clases |
| `formatToday`, `formatDate`, `formatNumber`, `formatPercent` | `utils/format.js` | `Intl` en es-ES |

## Sistema de diseño (`src/styles/theme.css`)

Todos los tokens viven en `@theme`. **Usa siempre los tokens, nunca un color fijo tipo `bg-[#173c33]`** (en props de color, `var(--color-…)`).

| Familia | Uso |
|---|---|
| `pine-50…950` | Verde bosque: marca, paneles oscuros, texto principal (`pine-950`) |
| `sand-50…400` | Arena: fondo de página (`sand-100`), superficies (`sand-50`), líneas |
| `honey-100…700` | Miel: **único acento**. Para texto pequeño sobre arena usa `honey-700` |
| `ink`, `ink-soft`, `ink-faint`, `line` | Texto secundario, placeholders y bordes de campos (contraste AA) |
| `clay-50/600/700` | Errores y acciones destructivas (`Button` variante `danger`) |
| `role-admin`, `role-usuario`, `role-superadmin` | Colores de datos por rol |

- **Tipografía:** `font-display` (Bricolage) solo para títulos, en `font-extrabold` con `tracking` negativo. Los números grandes van en `font-sans` (Geist).
- **Formas:** radios grandes en contenedores (`rounded-[28px]`), `rounded-xl` en campos y `rounded-full` en botones.
- **Movimiento:** curva `ease-out-strong`; animaciones de UI por debajo de 300 ms (las entradas de gráficos, `grow-x` y `draw`, duran 720 ms); entradas con `motion-safe:animate-rise`. Todo respeta `prefers-reduced-motion`.
- ⚠️ **Retrasos de entrada:** `[animation-delay:…]` junto a `motion-safe:animate-rise` **no funciona** (la utilidad con variante va después y el shorthand `animation` pone el retraso en 0). Usar `style={{ animationDelay }}` o, en la librería, el retraso dentro del mismo `@media`, como `.btk-auth__description`.
- **Utilidad `grain`:** grano sutil para los paneles verdes; el elemento debe ser `relative`.
- **Colores de datos:** validados con la skill `dataviz` (todos los pares de la dona, peor par ΔE 9,0 en protanopía). Si cambian, hay que volver a validarlos.

## Reglas para añadir componentes

- Solo piezas reutilizables y sin lógica de negocio: nada de llamadas a servicios ni rutas fijas de una app; las opciones llegan por props.
- JSX con clases `btk-*` y su `.css` al lado; importar ese `.css` en `src/styles/index.css`. Nada de cadenas de utilidades de Tailwind en el JSX.
- Exportarlo en `src/index.js` y añadirlo a la tabla de arriba.
- Después de cambiar la librería: `npm run build`, `npm run check`, subir la versión y publicar; en cada front, `npm install` y `npm run build`.

## Problemas conocidos

- No hay catálogo visual (Storybook o similar): los componentes se revisan a través de los fronts.
- La hoja compilada pesa más que las mismas clases generadas por la app (~45 KB, ~7 KB gzip) porque cada componente trae sus reglas completas; es el costo de no depender del Tailwind de la app.
