import { h } from './dom.js';

// Preview mode: lets the bundle run outside Auth0 (GitHub Pages / `npm run preview`) with fake data.
// Never used inside Auth0, where window.universal_login_context is always present.

const dbConnection = {
  name: 'Username-Password-Authentication',
  strategy: 'auth0',
  options: { signup_enabled: false, forgot_password_enabled: true },
};

const alternateConnections = [
  { name: 'google-oauth2', strategy: 'google-oauth2' },
  { name: 'empresa-azure-ad', strategy: 'waad', options: { display_name: 'Microsoft (empresa)', show_as_button: true } },
];

// Per-screen overrides on top of the common context below.
const mocks = {
  'login': {
    prompt: 'login',
    screen: { links: { reset_password: 'preview.html?screen=reset-password-request' } },
    transaction: { alternate_connections: alternateConnections },
  },
  'login-id': {
    prompt: 'login-id',
    transaction: { alternate_connections: alternateConnections },
  },
  'reset-password-request': { prompt: 'reset-password' },
  'reset-password-email': { prompt: 'reset-password', screen: { data: { email: 'usuario@empresa.com' } } },
  'reset-password': { prompt: 'reset-password' },
  'reset-password-success': { prompt: 'reset-password' },
  'reset-password-error': { prompt: 'reset-password' },
};

function mockContext(name) {
  const mock = mocks[name] ?? {};
  return {
    branding: {},
    client: { id: 'preview-client', name: 'POC Preview' },
    organization: {},
    prompt: { name: mock.prompt ?? name },
    screen: { name, links: {}, texts: {}, ...mock.screen },
    tenant: { name: 'preview', friendly_name: 'Preview', enabled_locales: ['es'] },
    transaction: { state: 'preview-state', locale: 'es', connection: dbConnection, ...mock.transaction },
    untrusted_data: {},
    user: {},
  };
}

export function installPreview(screenNames) {
  const name = new URLSearchParams(location.search).get('screen') ?? 'login';
  window.universal_login_context = mockContext(name);

  // The SDK submits a hidden <form> POST to Auth0. In preview, show the payload instead of sending it.
  HTMLFormElement.prototype.submit = function previewSubmit() {
    const payload = Object.fromEntries(
      [...new FormData(this)].map(([key, value]) => [key, /password/.test(key) ? '••••' : value]),
    );
    this.remove();
    console.info('[ACUL preview] submit', payload);
    showNotice(`Preview: el SDK enviaría a Auth0 → ${JSON.stringify(payload)}`);
  };

  document.body.append(
    h('nav', { class: 'preview-bar' },
      h('strong', {}, 'Preview'),
      screenNames.map((screen) => h('a', { href: `preview.html?screen=${screen}`, 'aria-current': screen === name ? 'page' : null }, screen)),
    ),
  );
}

function showNotice(message) {
  document.querySelector('.preview-notice')?.remove();
  document.body.append(h('div', { class: 'preview-notice', role: 'status' }, message));
}
