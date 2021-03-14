/*********************
// Main
*********************/

/* Switch Color Mode */

document.querySelector('[data-switch-color]').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('[data-switch-color-svg-sun]').classList.toggle('active');
  document.querySelector('[data-switch-color-svg-moon]').classList.toggle('active');
});
