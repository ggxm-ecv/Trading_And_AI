/*********************
// Main
*********************/

/* Switch Color Mode */

document.querySelector('[data-switch-color]').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.switch-color-mode__svg').forEach( elem => {
    elem.classList.toggle('active');
  });

});
