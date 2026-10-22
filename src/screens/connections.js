import { h } from '../dom.js';

// Social connections carry no display name in the context, only enterprise ones do.
const socialLabels = {
  'google-oauth2': 'Google',
  'windowslive': 'Microsoft',
  'apple': 'Apple',
  'facebook': 'Facebook',
  'linkedin': 'LinkedIn',
};

// One button per social/enterprise connection enabled for the application (transaction.alternateConnections).
export function connectionButtons(connections, onPick) {
  if (!connections?.length) return null;
  return h('div', { class: 'connections' },
    connections.map((connection) => {
      const label = connection.options?.displayName ?? socialLabels[connection.strategy] ?? connection.name;
      const icon = connection.options?.iconUrl;
      return h('button', { type: 'button', class: 'button button--secondary', onClick: () => onPick(connection.name) },
        icon && h('img', { src: icon, alt: '', width: 20, height: 20 }),
        `Continuar con ${label}`,
      );
    }),
  );
}
