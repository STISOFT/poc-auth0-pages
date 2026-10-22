import Login from '@auth0/auth0-acul-js/login';
import { h, field, errorList, onSubmit } from '../dom.js';
import { renderLayout } from '../layout.js';
import { connectionButtons } from './connections.js';

// prompt "login" / screen "login": identifier + password on the same page (was login.html).
export default function renderLogin() {
  const login = new Login();
  const { screen, transaction } = login;

  const form = onSubmit(
    h('form', { class: 'form' },
      errorList(transaction.errors),
      field({ label: 'Correo o usuario', name: 'username', autocomplete: 'username', value: screen.data?.username, autofocus: true }),
      field({ label: 'Contraseña', name: 'password', type: 'password', autocomplete: 'current-password' }),
      h('button', { type: 'submit', class: 'button' }, 'Ingresar'),
    ),
    ({ username, password }) => login.login({ username, password }),
  );

  renderLayout({
    title: 'Ingresa a tu Portal Empresa Demo',
    content: [
      form,
      connectionButtons(transaction.alternateConnections, (connection) => login.federatedLogin({ connection })),
      screen.resetPasswordLink && h('div', { class: 'first-time-access' },
        h('span', {}, '¿Ingresas por primera vez? '),
        h('a', { href: screen.resetPasswordLink }, 'Crea una nueva contraseña aquí.'),
      ),
    ],
  });
}
