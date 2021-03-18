/*********************
// Main
*********************/

/********* Switch Color Mode *********/

document.querySelector('[data-switch-color]').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.switch-color-mode__svg').forEach( elem => {
    elem.classList.toggle('active');
  });

});

/********* Step 1 : Experimental Pattern *********/

// Generate Items inside Pattern

let patternWidth = document.querySelector('.step-1__pattern-wrap').offsetWidth;
let patternHeight = document.querySelector('.step-1__pattern-wrap').offsetHeight;

let itemsPerRow = Math.floor(patternWidth / 40);
let itemsPerColumn = Math.floor(patternHeight / 40);

let nbItems = itemsPerRow * itemsPerColumn;


function insertItemsToPattern(nbItems) {

  let pattern = document.querySelector('.step-1__pattern-wrap');

  while (nbItems > 0) {

    let item = document.createElement('div');
    item.classList.add('step-1__pattern-item');
    let itemInner = document.createElement('div');
    itemInner.classList.add('step-1__pattern-item-inner');
    item.appendChild(itemInner);

    pattern.appendChild(item);

    nbItems--;
  }

}

insertItemsToPattern(nbItems);

// Items Animation

// (function() {
//
//     let mX, mY, distance,
//         $element  = $('.step-1__content-wrap .heading');
//
//     function calculateDistance(elem, mouseX, mouseY) {
//         return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
//     }
//
//     $(document).mousemove(function(e) {
//         mX = e.pageX;
//         mY = e.pageY;
//         distance = calculateDistance($element, mX, mY);
//     });
//
// })();
