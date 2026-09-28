# UiBiblioTK — Librería de interfaz (`@bibliotk/ui`)

Parte del sistema BiblioTK (ver `../CLAUDE.md`). Componentes React y tema de Tailwind CSS 4 compartidos por los fronts de BiblioTK. Hoy la consume `FrontBiblioTK`; los fronts futuros deben usarla en lugar de copiar componentes.

- **Sin build:** se distribuye el código fuente (`.jsx`) y lo compila el Vite de la app que la usa.
- **Lint/formato:** Biome (`npm run check`). Tabs y comillas dobles, igual que el front.
- **Peer dependencies:** `react` 19, `react-dom` 19, `react-router-dom` 7 (solo lo usa `PanelLayout`), `@phosphor-icons/react` 2 y `tailwindcss` 4.
- `npm install` aquí solo hace falta para Biome. npm instala también los peers en `node_modules/`, por eso la app tiene que deduplicarlos (paso 3).

## Cómo se consume

1. Dependencia local en la app: `"@bibliotk/ui": "file:../UiBiblioTK"` y `npm install`. npm crea un enlace, así que los cambios en la librería se ven al instante (con HMR).
2. CSS de la app:
   ```css
   @import "tailwindcss";
   @import "@bibliotk/ui/theme.css";
   ```
   `theme.css` trae los tokens, los estilos base, la utilidad `grain` y un `@source "../components"` para que Tailwind genere las clases que solo aparecen dentro de la librería.
3. `vite.config.js` de la app:
   ```js
   resolve: {
   	dedupe: ["react", "react-dom", "react-router", "react-router-dom", "@phosphor-icons/react"],
   },
   ```
   Sin esto Vite resuelve los imports de la librería contra `UiBiblioTK/node_modules`: dos copias de React ("Invalid hook call"), `NavLink` fuera del router e íconos que ignoran `IconContext`.
4. En el `main.jsx` de la app: importar las fuentes (`@fontsource-variable/bricolage-grotesque/opsz.css` y `@fontsource-variable/geist`) y fijar `IconContext` con `weight: "bold"` y `size: 18`. El tema nombra las fuentes, pero no las incluye.
5. Importar siempre desde la raíz del paquete: `import { Button, cn } from "@bibliotk/ui";`.

## Qué exporta (`src/index.js`)

| Export | Archivo | Notas |
|---|---|---|
| `AuthLayout`, `authHeadlineClasses` | `components/layout/AuthLayout.jsx` | Pantalla partida de login y registro |
| `PanelLayout` | `components/layout/PanelLayout.jsx` | Barra flotante superior. Props: `navItems` `[{ to, label, end }]`, `homePath`, `navLabel`, `userLabel`, `onLogout`. Las opciones las decide la app (por ejemplo, según el rol) |
| `ReaderLayout` | `components/layout/ReaderLayout.jsx` | Cabecera simple con logo y cerrar sesión |
| `Button`, `buttonClasses` | `components/ui/Button.jsx` | Variantes `primary`, `accent`, `outline`, `ghost` y `danger`; tamaños `sm`, `md` y `lg`; `loading` y `trailingIcon`. `buttonClasses()` da estilo de botón a un `Link` |
| `TextField`, `inputClasses` | `components/ui/TextField.jsx` | Etiqueta arriba; `error` o `hint` debajo, enlazados con `aria-describedby` |
| `PasswordField` | `components/ui/PasswordField.jsx` | `TextField` con botón para mostrar u ocultar |
| `Checkbox`, `Alert`, `Logo` | `components/ui/` | `Alert` tiene los tonos `error`, `info` y `success` |
| `Dialog` | `components/ui/Dialog.jsx` | `<dialog>` nativo en modo modal. Props: `open`, `onClose`, `title`, `description`, `icon`, `tone` (`neutral` o `danger`) y `dismissible`. Escape, el clic en el fondo y el botón Cerrar llaman a `onClose` (salvo con `dismissible={false}`). El foco inicial cae en el primer control del contenido |
| `DonutChart` | `components/data/DonutChart.jsx` | Gráfico de dona. Props: `segments` `[{ key, label, value, color }]`, `totalLabel`, `formatValue` y `formatShare`. En el centro muestra el total o el tramo activo; la leyenda son botones (hover y foco resaltan, clic fija el resaltado) |
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

- **Tipografía:** `font-display` (Bricolage) solo para títulos, en `font-extrabold` con `tracking` negativo. Los números grandes van en `font-sans` (Geist), no en la display.
- **Formas:** radios grandes en contenedores (`rounded-[28px]`), `rounded-xl` en campos y `rounded-full` en botones.
- **Movimiento:** curva `ease-out-strong`; animaciones de UI por debajo de 300 ms (las entradas de gráficos, `grow-x` y `draw`, duran 720 ms); entradas con `motion-safe:animate-rise` y `[animation-delay:…]` para escalonar. Todo respeta `prefers-reduced-motion`.
- **Utilidad `grain`:** grano sutil para los paneles verdes; el elemento debe ser `relative`.
- **Colores de datos:** validados con la skill `dataviz` (banda de luminosidad, croma, separación para daltonismo y contraste ≥ 3:1). En la dona el último tramo toca al primero, así que se validaron **todos los pares** (`--pairs all`): peor par ΔE 9,0 en protanopía. Si cambian, hay que volver a validarlos.

## Reglas para añadir componentes

- Solo piezas reutilizables y sin lógica de negocio: nada de llamadas a servicios ni rutas fijas de una app; las opciones llegan por props.
- Exportarlas en `src/index.js` y añadirlas a la tabla de arriba.
- Si usan clases en un archivo fuera de `src/components`, ampliar el `@source` de `theme.css`.
- Después de cambiar la librería, comprobar el front con `npm run build` en `FrontBiblioTK`.

## Problemas conocidos

- No hay catálogo visual (Storybook o similar): los componentes se revisan a través del front.
- Al ser una dependencia `file:`, quien clone solo el front necesita esta carpeta al lado (`../UiBiblioTK`).
- Es un repositorio git nuevo, todavía sin commits ni remoto.
