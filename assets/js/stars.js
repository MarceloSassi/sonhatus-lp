const COUNT_MOBILE = 40;
const COUNT_DESKTOP = 80;

const random = (min, max) => min + Math.random() * (max - min);

export function initStars(selector = '.sky-stars') {
  const layer = document.querySelector(selector);
  if (!layer) return;

  const count = window.matchMedia('(min-width: 768px)').matches ? COUNT_DESKTOP : COUNT_MOBILE;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('span');
    star.className = 'sky-star';
    star.style.setProperty('--x', `${random(0, 100).toFixed(2)}%`);
    star.style.setProperty('--y', `${random(0, 100).toFixed(2)}%`);
    star.style.setProperty('--size', `${random(1.5, 3.2).toFixed(1)}px`);
    star.style.setProperty('--peak', random(0.5, 0.9).toFixed(2));
    star.style.setProperty('--duration', `${random(3, 8).toFixed(1)}s`);
    star.style.setProperty('--delay', `${random(-8, 0).toFixed(1)}s`);
    fragment.appendChild(star);
  }

  layer.appendChild(fragment);
}
