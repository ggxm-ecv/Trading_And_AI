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
 Slide steps with gsap
---------------------------------------------*/

var currentIndex = 0;
var isAllowScroll = true;
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
  if(index < 0 || index >= steps.length) {
    return;
  }

  isAllowScroll = false;

  steps[currentIndex].classList.remove('show');
  steps[index].classList.add('show');
  var direction = index > currentIndex ? '-' : '+';
  gsap.to([steps[currentIndex], steps[index]], 1, {
    y: direction + '=100%',
    ease: 'power2.out',
    onComplete: function() {
      isAllowScroll=true
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
