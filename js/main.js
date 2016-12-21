
var CONSTANTS = {
  Duration: 25,
  ShortBreak: 5,
  LongBreak: 15
};

var Timer = function (mode, fnOnTick, fnOnStart, fnOnStop, fnOnAbort) {
  this.running = false;
  this._tickHander = null;
  
  //TODO: supports modes - normal, shortbreak and longbreak.
  // remaining time in seconds.
  this.remaining = CONSTANTS.Duration * 60;
  
  this.callbacks = {};
  this.callbacks.onTick = fnOnTick;
  this.callbacks.onStart = fnOnStart;
  this.callbacks.onStop = fnOnStop;
  this.callbacks.onAbort = fnOnAbort;
};

Timer.prototype.start = function () {
  
  if (this.running)
    return;
  
  this.running = true;
  if (this.callbacks.onStart)
    this.callbacks.onStart ();
  
  var self = this;
  this._tickHander = setInterval (function () { return self._tick(); }, 1000);
};

Timer.prototype._tick = function () {
  
  console.debug ("tick - " + this.remaining);
  
  if (this.callbacks.onTick) {
    this.callbacks.onTick (this.remaining);
  }
  
  this.remaining = this.remaining - 1;
};

Timer.prototype.stop = function () {
  this.running = false;
  
  if (this._tickHandler) {
    clearInterval (this._tickHander);
    this._tickHander = null;
  }
  
  if (this.callbacks.onStop)
    this.callbacks.onStop ();
};

Timer.prototype.abort = function () {
  this.running = false;
  
  if (this._tickHandler) {
    clearInterval (this._tickHander);
    this._tickHander = null;
  }
  
  if (this.callbacks.onAbort) {
    this.callbacks.onAbort ();
  }
};


