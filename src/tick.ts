/* End user interface:
 * setTimeout() - call a function once after a specific amount of time has passed
 * clearTimeout() - cancel a timeout set by setTimeout()
 * setInterval() - call a function at a specific period
 * clearInterval() - cancel an interval set by setInterval()
 */

function test() {
  let myInterval: Interval = setInterval(test2, 500);
}

function test2() {
  console.log("test successful")
}

class Timeout {
  time: number;
  timer: number;
  interval: number = 2;
  initialTime: number;
  prevTime: number;
  active: boolean;
  endFunction: Function;
  iteration: number = 0;
  constructor(func: Function, time: number) {
    this.time = time;
    this.endFunction = func;
    this.start();
  }
  tick(): void {
    if(!this.active) {
      window.clearInterval(this.timer);
      return;
    }
    let now = performance.now();
    if(this.active && now - this.initialTime >= this.time) {
      this.end()
    } else if (this.active && now - this.initialTime < this.interval) {
      window.clearInterval(this.timer);
      this.timer = window.setTimeout(this.end.bind(this), this.interval-(now-this.initialTime))
    }
    this.prevTime = now;
  }
  start(): void {
    this.timer = window.setInterval(this.tick.bind(this), this.interval);
    this.initialTime = performance.now();
    this.prevTime = this.initialTime;
    this.iteration = this.iteration +1;
    this.active = true;
  }
  end(): void {
    console.log("Elapsed:", performance.now() - this.initialTime)
    window.clearInterval(this.timer);
    this.stop()
    this.endFunction();
  }
  stop(): void {
    this.active = false;
  }
}

class Interval extends Timeout {
  constructor(func: Function, time: number) {
    super(func, time);
  }
  end(): void {
    super.end();
    this.start();
  }
}

function setTimeout(func: Function, time: number): Timeout {
  return new Timeout(func, time);
}

function setInterval(func: Function, time: number): Interval {
  return new Interval(func, time);
}

function clearTimeout(to_clear: Timeout) {
  to_clear.stop();
}

function clearInterval(to_clear: Interval) {
  to_clear.stop();
}

window.onload = test;
