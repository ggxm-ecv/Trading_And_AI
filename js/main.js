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


/********* Main Nav *********/

document.querySelector('.header__nav-down').addEventListener('click', event => {

});

document.querySelector('.header__nav-up').addEventListener('click', event => {

});


/********* Slider steps *********/

let scrollPos = 0;
let stepHeight = document.querySelector('.step').offsetHeight;
let nbOfStep = document.querySelectorAll('.steps > .step').length;
let targetLastStep = stepHeight * (nbOfStep - 1);

document.querySelector('.steps').addEventListener('scroll', function() {

  let newScrollPos = document.querySelector('.steps').scrollTop;

  // Update Header Nav Up
  if (newScrollPos > 0) {
    document.querySelector('.header__nav-up').classList.add('active');
  } else {
    document.querySelector('.header__nav-up').classList.remove('active');
  }
  // Update Header Nav Down
  if (newScrollPos >= targetLastStep) {
    document.querySelector('.header__nav-down').classList.remove('active');
  } else {
    document.querySelector('.header__nav-down').classList.add('active');
  }

  if (newScrollPos > scrollPos) {
    // On scroll down


  } else {
    // On scroll up


  }

  // saves the new position for iteration.
	scrollPos = newScrollPos;
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
