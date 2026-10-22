// Tiny DOM helper. Children may be nodes, strings (rendered as text, never as HTML) or falsy values.
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'class') el.className = value;
    else el.setAttribute(key, value === true ? '' : value);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : String(child));
  }
  return el;
}

// Labelled input bound to the form field name Auth0 expects.
export function field({ label, name, type = 'text', autocomplete, value, autofocus }) {
  const id = `field-${name}`;
  return h('div', { class: 'field' },
    h('label', { for: id }, label),
    h('input', { id, name, type, autocomplete, value, autofocus, required: true }),
  );
}

// Errors returned by Auth0 after a failed submit (transaction.errors).
export function errorList(errors) {
  if (!errors?.length) return null;
  return h('div', { class: 'alert alert--error', role: 'alert' },
    errors.map((error) => h('p', {}, error.message)),
  );
}

// Disables the submit button while the SDK posts the form, so it cannot be sent twice.
export function onSubmit(form, handler) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
      await handler(Object.fromEntries(new FormData(form)));
    } finally {
      if (button) button.disabled = false;
    }
  });
  return form;
}
