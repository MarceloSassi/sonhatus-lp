const COMPACT_AFTER = 24;

export function initNav(selector = '[data-nav]') {
  const nav = document.querySelector(selector);
  if (!nav) return;

  const toggle = nav.querySelector('[data-nav-toggle]');
  const menu = document.getElementById(toggle.getAttribute('aria-controls'));

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
    setOpen(false);
    toggle.focus();
  });

  const updateCompact = () => nav.classList.toggle('is-compact', window.scrollY > COMPACT_AFTER);
  window.addEventListener('scroll', updateCompact, { passive: true });
  updateCompact();
}
