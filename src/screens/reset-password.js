import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
import { h, field, errorList, onSubmit } from '../dom.js';
import { renderLayout } from '../layout.js';

// Screens of the "reset-password" prompt (was reset-password.html and error.html).
// The user-facing flow is: request -> email -> reset-password -> success | error.

export function renderResetPasswordRequest() {
  const request = new ResetPasswordRequest();
  const { screen, transaction } = request;

  renderLayout({
    title: 'Restablece tu contraseña',
    content: [
      h('p', {}, 'Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.'),
      onSubmit(
        h('form', { class: 'form' },
          errorList(transaction.errors),
          field({ label: 'Correo o usuario', name: 'username', autocomplete: 'username', value: screen.data?.username ?? screen.data?.email, autofocus: true }),
          h('button', { type: 'submit', class: 'button' }, 'Enviar enlace'),
        ),
        ({ username }) => request.resetPassword({ username }),
      ),
      h('button', { type: 'button', class: 'button button--link', onClick: () => request.backToLogin() }, 'Volver al inicio de sesión'),
    ],
  });
}

export function renderResetPasswordEmail() {
  const email = new ResetPasswordEmail();
  const address = email.screen.data?.email ?? email.screen.data?.username;

  renderLayout({
    title: 'Revisa tu correo',
    content: [
      h('p', {}, 'Te enviamos un enlace para restablecer tu contraseña',
        address ? [' a ', h('strong', {}, address)] : null, '.'),
      h('button', { type: 'button', class: 'button button--secondary', onClick: () => email.resendEmail() }, 'Reenviar correo'),
    ],
  });
}

export function renderResetPassword() {
  const reset = new ResetPassword();
  const { transaction } = reset;

  renderLayout({
    title: 'Crea una nueva contraseña',
    content: onSubmit(
      h('form', { class: 'form' },
        errorList(transaction.errors),
        field({ label: 'Nueva contraseña', name: 'password-reset', type: 'password', autocomplete: 'new-password', autofocus: true }),
        field({ label: 'Repite la contraseña', name: 're-enter-password', type: 'password', autocomplete: 'new-password' }),
        h('button', { type: 'submit', class: 'button' }, 'Guardar contraseña'),
      ),
      (values) => reset.resetPassword({ 'password-reset': values['password-reset'], 're-enter-password': values['re-enter-password'] }),
    ),
  });
}

export function renderResetPasswordSuccess() {
  new ResetPasswordSuccess();
  renderLayout({
    title: 'Contraseña actualizada',
    content: h('div', { class: 'alert alert--success' }, 'Tu contraseña se cambió correctamente. Ya puedes volver a la aplicación e ingresar.'),
  });
}

export function renderResetPasswordError() {
  const { screen } = new ResetPasswordError();
  renderLayout({
    title: 'Ocurrió un problema',
    content: h('div', { class: 'alert alert--error', role: 'alert' },
      screen.texts?.description ?? 'El enlace para restablecer tu contraseña no es válido o ya expiró. Solicita uno nuevo.'),
  });
}
