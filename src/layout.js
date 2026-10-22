import { h } from './dom.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Neutral demo logo. Replace with the real brand SVG for the final version.
function logo() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '52');
  svg.setAttribute('height', '52');
  svg.setAttribute('viewBox', '0 0 52 52');
  svg.setAttribute('aria-hidden', 'true');
  const rect = document.createElementNS(SVG_NS, 'rect');
  Object.entries({ width: 52, height: 52, rx: 12, fill: 'var(--primary-color)' })
    .forEach(([k, v]) => rect.setAttribute(k, v));
  const text = document.createElementNS(SVG_NS, 'text');
  Object.entries({ x: 26, y: 31, 'text-anchor': 'middle', 'font-family': 'Arial, sans-serif', 'font-size': 13, 'font-weight': 700, fill: '#fff' })
    .forEach(([k, v]) => text.setAttribute(k, v));
  text.textContent = 'ACME';
  svg.append(rect, text);
  return svg;
}

function infoCard(icon, highlight, rest) {
  return h('div', { class: 'main-container__right-section__info-cards__card' },
    h('div', { class: 'main-container__right-section__card-icon' }, icon),
    h('p', {}, h('span', { class: 'main-container__right-section__highlight' }, highlight), ` ${rest}`),
  );
}

// Same skeleton as the original pages: wrapper > main-header > main-container (2 columns) > main-footer.
// `content` goes in the left column, where the old #api placeholder used to be.
export function renderLayout({ title, content }) {
  const page = h('div', { class: 'wrapper' },
    h('header', { class: 'main-header' },
      h('span', { class: 'logo', title: 'Portal Empresa Demo' }, logo(), h('hr'), h('span', {}, 'EMPRESA')),
    ),
    h('main', { class: 'main-container' },
      h('div', { class: 'main-container__left-section' },
        h('div', { class: 'main-container__form' },
          h('h2', {}, title),
          h('div', { id: 'api' }, content),
        ),
      ),
      h('div', { class: 'main-container__right-section' },
        h('div', { class: 'main-container__right-section__info-cards' },
          h('div', { class: 'main-container__right-section__info-cards__card-title' },
            h('h3', {}, 'Tu aliado en la ', h('br'), 'gestión de tu ',
              h('span', { class: 'main-container__right-section__highlight' }, 'empresa')),
          ),
          infoCard('💳', 'Crea QR y asígnalos a tus', 'cajas, colaboradores, locales o servicios'),
          infoCard('📊', 'Organiza el cobro de tus ventas', 'y genera reportes más detallados.'),
        ),
      ),
    ),
    h('footer', { class: 'main-footer' }),
  );
  document.body.append(page);
}
