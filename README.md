# Auth0 POC — Login Pages (ACUL)

Páginas de diseño para la POC de "Advanced Customizations for Universal Login" (ACUL) en Auth0.

> **Importante:** esta versión usa una marca de demostración neutral ("Portal Empresa Demo",
> logo genérico y paleta azul). Para la versión final, reemplaza el logo SVG de la cabecera, los
> textos y las variables `--slate2-*` de `css/styles.css` por los de la marca real.

## Estructura

```
auth0-poc-login-pages/
├── index.html            # landing con links a las 4 páginas, solo para navegar la POC
├── login.html            # pantalla de login
├── reset-password.html   # reset de contraseña / OTP
├── idp-selector.html     # selección de proveedor de identidad
├── error.html             # página de error
└── css/
    └── styles.css          # design tokens y layout compartido (colores, tipografía, grid de 2 columnas)
```

Cada página comparte el mismo esqueleto (`wrapper > main-header > main-container (2 columnas) >
main-footer`): la columna izquierda tiene el formulario (`#api`), y la derecha
muestra el panel de branding ("Tu aliado en la gestión de tu empresa").

El `<div id="api">` es el placeholder: ahí es donde, en el ACUL real, el SDK de Auth0 inyecta el
formulario/widget de cada pantalla. Hoy solo tiene un texto de marcador de posición para poder
previsualizar el diseño.

## Cómo publicarlo en GitHub Pages (gratis)

1. Crea un repo nuevo en GitHub (puede ser público, sin costo) y sube el contenido de esta carpeta.
2. En el repo: `Settings > Pages > Source: Deploy from a branch` → rama `main`, carpeta `/ (root)`.
3. En unos minutos tendrás la URL pública:
   `https://<tu-usuario>.github.io/<repo>/login.html` (y así para cada pantalla).
4. Esas URLs son las que configuras en Auth0 (ACUL) para cada pantalla una vez que tengas el
   dominio custom activo en tu tenant de pruebas.

## Próximos pasos para integrar con Auth0 ACUL

- Reemplazar el contenido de `#api` por el markup/JS que genera el ACUL SDK para cada pantalla
  (login, reset-password, idp-selector, error).
- Configurar en Auth0 (Management API o Dashboard) la URL de cada página publicada en GitHub Pages
  como el host de la pantalla correspondiente.
- Validar CORS/SRI si Auth0 lo requiere para los assets (`css/styles.css`).
