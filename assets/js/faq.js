export function initFaq(root = document.querySelector('[data-faq]')) {
  if (!root) return;

  const close = (trigger, panel) => {
    panel.style.height = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      panel.style.height = '0px';
    });
    trigger.setAttribute('aria-expanded', 'false');
  };

  const open = (trigger, panel) => {
    panel.style.height = `${panel.scrollHeight}px`;
    trigger.setAttribute('aria-expanded', 'true');
  };

  root.addEventListener('transitionend', (event) => {
    const panel = event.target;
    if (event.propertyName !== 'height' || !panel.classList.contains('faq__panel')) return;
    if (panel.style.height !== '0px') panel.style.height = 'auto';
  });

  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('.faq__trigger');
    if (!trigger) return;

    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    root.querySelectorAll('.faq__trigger[aria-expanded="true"]').forEach((other) => {
      if (other === trigger) return;
      close(other, document.getElementById(other.getAttribute('aria-controls')));
    });

    if (isOpen) close(trigger, panel);
    else open(trigger, panel);
  });
}
