/*! cro.js conversion goals: the events mesure.js already counts (free_download click, tool_use click = example or generate, checkout_start = #octave-pay submit). */
((d, g) => {
  g = (m) => window.octaveCro && window.octaveCro.goal(m);
  d.addEventListener('click', (e) => { let a = e.target.closest && e.target.closest('[data-mesure="free_download"]'); a && g('download'); a = e.target.closest && e.target.closest('[data-mesure="tool_use"]'); a && g('tool'); }, true);
  d.addEventListener('submit', (e) => { e.target.id == 'octave-pay' && g('checkout'); }, true);
})(document);
