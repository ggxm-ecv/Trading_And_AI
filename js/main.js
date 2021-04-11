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


/*********************
// Steps
*********************/

/********* On Scroll : Slider Steps (gsap) *********/

var currentIndex = 0;
var isAllowScroll = true;
var isAllowClick = true;
var wheelEvents = [];
var prevTime;
var steps = document.querySelectorAll('.step');

window.addEventListener('wheel', handleWheel, {
  passive: false
});

function handleWheel(e) {
  e.preventDefault();

  var time = new Date().getTime();
  var value = e.wheelDelta;
  var delta = Math.max(-1, Math.min(1, value));
  var isVertical = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta);

  if(wheelEvents.length > 149){
    wheelEvents.shift();
  }

  wheelEvents.push(Math.abs(value));

  var timeDiff = time - prevTime;
  prevTime = time;

  if(timeDiff > 200){
    wheelEvents = [];
  }

  if (isAllowScroll) {
    var averageEnd = getAverage(wheelEvents, 10);
    var averageMiddle = getAverage(wheelEvents, 70);
    var isAccelerating = averageEnd >= averageMiddle;

    if(isVertical && isAccelerating) {
      if (delta < 0) {
        update(currentIndex + 1);
      } else {
        update(currentIndex - 1);
      }
    }
  }
}

function update(index) {

  // Update Main Nav style
  if(index > 0) {
    document.querySelector('.header__nav-up').classList.add('active');
  } else {
    document.querySelector('.header__nav-up').classList.remove('active');
  }
  if(index < (steps.length - 1)) {
    document.querySelector('.header__nav-down').classList.add('active');
  } else {
    document.querySelector('.header__nav-down').classList.remove('active');
  }

  if(index < 0 || index >= steps.length) {
    return;
  }

  // Upadte Steps style
  steps[currentIndex].classList.remove('show');
  steps[index].classList.add('show');

  isAllowScroll = false;
  isAllowClick = false;

  var direction = index > currentIndex ? '-' : '+';
  gsap.to([steps[currentIndex], steps[index]], 1, {
    y: direction + '=100%',
    ease: 'power2.out',
    onComplete: function() {

      isAllowScroll=true;
      isAllowClick=true;

      // Update Header Step number
      document.querySelector('.header__step-current').innerHTML = `${index+1}`;

    }
  });

  currentIndex = index;
}

function getAverage(elements, number){
  var sum = 0;
  var lastElements = elements.slice(Math.max(elements.length - number, 1));

  for(var i = 0; i < lastElements.length; i++){
    sum = sum + lastElements[i];
  }

  return Math.ceil(sum/number);
}


/********* On Nav Click : Slider steps (gsap) *********/

// On Click Next
const btnStepNext = document.querySelectorAll('[data-step-next]');
btnStepNext.forEach((el) => {
  el.addEventListener('click', function(event) {
    event.preventDefault();
    if (isAllowClick) {
      update(currentIndex + 1);
    }
  })
});
// On Click Prev
const btnStepPrev = document.querySelectorAll('[data-step-prev]');
btnStepPrev.forEach((el) => {
  el.addEventListener('click', function(event) {
    event.preventDefault();
    if (isAllowClick) {
      update(currentIndex - 1);
    }
  })
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
