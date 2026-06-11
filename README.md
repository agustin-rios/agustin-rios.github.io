# agustin-rios.github.io

Sitio personal y portafolio de **Agustín Ríos** — platform engineering, DevOps y backend en TypeScript/Python.

🔗 **Live:** [agustin-rios.github.io](https://agustin-rios.github.io)

## Stack

HTML, CSS y JavaScript vanilla. Sin frameworks, sin build step: lo que está en `main` es lo que se sirve.

- **Tipografía** auto-alojada ([Archivo](https://fonts.google.com/specimen/Archivo) variable + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)), subsets latinos en woff2.
- **i18n** ES/EN con un diccionario en `js/main.js` (`data-i18n`), persistido en `localStorage`. El contenido base vive en el HTML en español: sin JS, el sitio funciona completo.
- **Accesibilidad:** contraste AA, `prefers-reduced-motion`, skip-link, focus visible, scroll-spy con `IntersectionObserver`.
- **SEO:** meta description, Open Graph + imagen 1200×630, JSON-LD (`schema.org/Person`), sitemap y robots.

## Estructura

```
.
├── index.html          # contenido completo (ES por defecto)
├── 404.html
├── css/style.css       # design tokens + estilos (tema "RFC·3747")
├── js/main.js          # i18n, scroll-spy, reveals, copy-email
├── assets/
│   ├── fonts/          # woff2 auto-alojados
│   ├── img/            # og.png, apple-touch-icon
│   └── favicon.svg
├── scripts/            # automatización del perfil de GitHub (gh CLI)
├── robots.txt
└── sitemap.xml
```

## Desarrollo local

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

GitHub Pages sirve la rama `main` (raíz). Cada push a `main` publica.
