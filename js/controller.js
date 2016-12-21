// require ('timer');

var onStart = function () { console.log ("started"); };
var onStop = function () { console.log ("stopped"); };
var onTick = function (tick) { console.log (tick); };

var toggleTimer = function (timer) {
  if (timer.running)
    timer.stop ();
  else
    timer.start ();
};


var myTimer = new Timer ('normal', onTick, onStart, onStop);

document.getElementById ('mytimer').addEventListener('click', toggleTimer (myTimer));
