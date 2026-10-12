// Router: reads location.hash and tells the app which screen to show (ADR-006).
// Only ids ever go in the hash, never worry text (N2).

const SIMPLE_ROUTES = ['today', 'new', 'garden', 'settings', 'about'];

/** Turns "#check/w_abc" into { name: 'check', id: 'w_abc' }; anything unknown becomes Today. */
export function parseHash(hash) {
  const path = hash.replace(/^#/, '');
  if (SIMPLE_ROUTES.includes(path)) return { name: path, id: null };
  const match = /^check\/(w_[a-z0-9]+)$/.exec(path);
  if (match) return { name: 'check', id: match[1] };
  return { name: 'today', id: null };
}

export function go(name) {
  window.location.hash = `#${name}`;
}

/** Calls onRoute now and after every hash change. Fixes unknown hashes without a new history entry. */
export function startRouter(onRoute) {
  const handle = () => {
    const route = parseHash(window.location.hash);
    const expected = route.id ? `#${route.name}/${route.id}` : `#${route.name}`;
    if (window.location.hash !== expected) {
      history.replaceState(null, '', expected);
    }
    onRoute(route);
  };
  window.addEventListener('hashchange', handle);
  handle();
}
