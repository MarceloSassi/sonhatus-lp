// A refração usa filtro SVG no backdrop-filter, suportado só pelo Chromium.
// Nos demais navegadores o vidro segue apenas com blur.
export function initGlass() {
  if (!navigator.userAgentData) return;
  document.documentElement.classList.add('has-refraction');
}
