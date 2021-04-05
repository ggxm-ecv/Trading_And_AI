// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());


/*********************
// Plugins
*********************/

/*--------------------------------------------
 test slide steps by me
---------------------------------------------*/

let isAllowScroll = true;
let currentIndex = 0;
const steps = document.querySelectorAll('.step');


document.querySelector('.steps').addEventListener('wheel', event => {

  event.preventDefault();

  if (isAllowScroll) {

    if (event.deltaY < 0) {

      if (currentIndex > 0 && currentIndex <= steps.length) {
        stepPrev();
      }

    } else if (event.deltaY > 0) {

      if (currentIndex >= 0 && currentIndex < (steps.length - 1)) {
        stepNext();
      }

    }

  }

});

function stepNext() {

  isAllowScroll = false;

  steps[currentIndex].classList.remove('active');
  steps[currentIndex].classList.add('past');
  steps[currentIndex + 1].classList.add('active');

  currentIndex += 1;

  setTimeout(function(){ isAllowScroll = true; }, 800);

}

function stepPrev() {

  isAllowScroll = false;

  steps[currentIndex - 1].classList.remove('past');
  steps[currentIndex - 1].classList.add('active');
  steps[currentIndex].classList.remove('active');

  currentIndex -= 1;

  setTimeout(function(){ isAllowScroll = true; }, 800);

}


/*--------------------------------------------
 test slide steps with gsap
---------------------------------------------*/
// TODO: test to do this without gsap (with event wheel ?)
// TODO: else > do this with personal minimal code

// var currentIndex = 0;
// var isAllowScroll = true;
// var wheelEvents = [];
// var prevTime;
// var steps = document.querySelectorAll('.step');
//
// window.addEventListener('wheel', handleWheel, {
//   passive: false
// });
//
// function handleWheel(e) {
//     e.preventDefault();
//
//     var time = new Date().getTime();
//     var value = e.wheelDelta;
//     var delta = Math.max(-1, Math.min(1, value));
//     var isVertical = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta);
//
//     if(wheelEvents.length > 149){
//         wheelEvents.shift();
//     }
//
//     wheelEvents.push(Math.abs(value));
//
//     var timeDiff = time - prevTime;
//     prevTime = time;
//
//     if(timeDiff > 200){
//         wheelEvents = [];
//     }
//
//     if (isAllowScroll) {
//         var averageEnd = getAverage(wheelEvents, 10);
//         var averageMiddle = getAverage(wheelEvents, 70);
//         var isAccelerating = averageEnd >= averageMiddle;
//
//         if(isVertical && isAccelerating) {
//             if (delta < 0) {
//                 update(currentIndex + 1);
//             } else {
//                 update(currentIndex - 1);
//             }
//         }
//     }
// }
//
//
// function update(index) {
//   if(index < 0 || index >= steps.length) {
//     return;
//   }
//
//   isAllowScroll = false;
//
//   var direction = index > currentIndex ? '-' : '+';
//   gsap.to([steps[currentIndex], steps[index]], 1.2, {
//     y: direction + '=100%',
//     ease: 'power2.out',
//     onComplete: function() {
//       isAllowScroll=true
//     }
//   });
//
//   currentIndex = index;
// }
//
// function getAverage(elements, number){
//   var sum = 0;
//   var lastElements = elements.slice(Math.max(elements.length - number, 1));
//
//   for(var i = 0; i < lastElements.length; i++){
//     sum = sum + lastElements[i];
//   }
//
//   return Math.ceil(sum/number);
// }
