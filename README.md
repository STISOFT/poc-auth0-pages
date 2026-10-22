# Auth0 POC — Login Pages (ACUL)

Bundle JS/CSS para la POC de "Advanced Customizations for Universal Login" (ACUL) en Auth0.

> **Importante:** esta versión usa una marca de demostración neutral ("Portal Empresa Demo",
> logo genérico y paleta azul). Para la versión final, reemplaza el logo SVG de `src/layout.js`,
> los textos y las variables `--slate2-*` de `src/styles.css` por los de la marca real.

## Cómo funciona

Con ACUL, **Auth0 sirve el HTML** de cada pantalla desde el dominio custom del tenant y carga
nuestros assets mediante `head_tags`. Este repo genera esos assets:

- `dist/acul.js` — un único bundle (IIFE) que lee `window.universal_login_context.screen.name` y
  dibuja la pantalla correspondiente usando el SDK [`@auth0/auth0-acul-js`](https://www.npmjs.com/package/@auth0/auth0-acul-js).
- `dist/acul.css` — estilos compartidos.

Los nombres de archivo son fijos (sin hash), así que los `head_tags` registrados en Auth0 no
cambian entre deploys. GitHub Pages actúa como CDN.

| Pantalla original     | Prompt / screen de Auth0                              |
|-----------------------|-------------------------------------------------------|
| `login.html`          | `login` / `login`                                     |
| `idp-selector.html`   | `login-id` / `login-id` (botones de conexiones + correo) |
| `reset-password.html` | `reset-password` / `reset-password-request`, `reset-password-email`, `reset-password`, `reset-password-success` |
| `error.html`          | `reset-password` / `reset-password-error`             |

## Estructura

```
├── src/
│   ├── main.js              # entrada: mapa screen.name -> renderer
│   ├── layout.js            # esqueleto común (header, columna de formulario, panel de branding)
│   ├── dom.js               # helpers de DOM (sin innerHTML)
│   ├── preview.js           # contexto simulado para previsualizar fuera de Auth0
│   ├── styles.css
│   └── screens/             # una función por pantalla de Auth0
├── public/                  # index.html (landing) y preview.html, copiados tal cual a dist/
├── vite.config.js
└── .github/workflows/deploy.yml   # build + deploy de dist/ a GitHub Pages en cada push a main
```

## Desarrollo

```bash
npm install
npm run preview   # build + servidor local en http://localhost:4173/preview.html?screen=login
```

Fuera de Auth0 no existe `universal_login_context`, así que `preview.js` crea uno de prueba según
`?screen=<nombre>` y, en vez de enviar el formulario a Auth0, muestra el payload que enviaría el SDK.

## Configuración en Auth0 (pendiente)

Requisitos: dominio custom verificado, New Universal Login y una aplicación First Party.
Para cada pantalla de la tabla, activar `rendering_mode: "advanced"` con estos `head_tags`:

```json
{
  "rendering_mode": "advanced",
  "head_tags": [
    { "tag": "script", "attributes": { "src": "https://stisoft.github.io/poc-auth0-pages/acul.js", "defer": true } },
    { "tag": "link", "attributes": { "rel": "stylesheet", "href": "https://stisoft.github.io/poc-auth0-pages/acul.css" } }
  ]
}
```

Se aplica con la Management API (`PATCH /api/v2/prompts/{prompt}/screen/{screen}/rendering`) o
con el Auth0 CLI (`auth0 ul customize`).
