import LoginId from '@auth0/auth0-acul-js/login-id';
import { h, field, errorList, onSubmit } from '../dom.js';
import { renderLayout } from '../layout.js';
import { connectionButtons } from './connections.js';

// prompt "login-id" / screen "login-id": identity-provider selector (was idp-selector.html).
// Lists the enabled social/enterprise connections, with the email identifier as a fallback.
export default function renderLoginId() {
  const loginId = new LoginId();
  const { screen, transaction } = loginId;

  const form = onSubmit(
    h('form', { class: 'form' },
      field({ label: 'Correo o usuario', name: 'username', autocomplete: 'username', value: screen.data?.username }),
      h('button', { type: 'submit', class: 'button' }, 'Continuar'),
    ),
    ({ username }) => loginId.login({ username }),
  );

  const connections = connectionButtons(transaction.alternateConnections, (connection) => loginId.federatedLogin({ connection }));

  renderLayout({
    title: 'Ingresa a tu Portal Empresa Demo',
    content: [
      errorList(transaction.errors),
      connections,
      connections && h('p', { class: 'divider' }, 'o ingresa con tu correo'),
      form,
    ],
  });
}
