import './styles.css';
import { h } from './dom.js';
import { renderLayout } from './layout.js';
import { installPreview } from './preview.js';
import renderLogin from './screens/login.js';
import renderLoginId from './screens/login-id.js';
import {
  renderResetPasswordRequest,
  renderResetPasswordEmail,
  renderResetPassword,
  renderResetPasswordSuccess,
  renderResetPasswordError,
} from './screens/reset-password.js';

// Auth0 screen name -> renderer. Every screen configured with rendering_mode "advanced" must be here.
export const screens = {
  'login': renderLogin,
  'login-id': renderLoginId,
  'reset-password-request': renderResetPasswordRequest,
  'reset-password-email': renderResetPasswordEmail,
  'reset-password': renderResetPassword,
  'reset-password-success': renderResetPasswordSuccess,
  'reset-password-error': renderResetPasswordError,
};

function start() {
  // Outside Auth0 (GitHub Pages, local preview) there is no context: fake one from ?screen=.
  if (!window.universal_login_context) installPreview(Object.keys(screens));

  const name = window.universal_login_context?.screen?.name;
  const render = screens[name];
  if (render) {
    render();
  } else {
    renderLayout({
      title: 'Pantalla no soportada',
      content: h('div', { class: 'alert alert--error' }, `Este bundle no implementa la pantalla "${name}".`),
    });
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
