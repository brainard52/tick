/* End user interface:
 * setTimeout() - call a function once after a specific amount of time has passed
 * clearTimeout() - cancel a timeout set by setTimeout()
 * setInterval() - call a function at a specific period
 * clearInterval() - cancel an interval set by setInterval()
 */

function clearTimeout(to_clear: Timeout) {
  to_clear.stop();
}

function clearInterval(to_clear: Interval) {
  to_clear.stop();
}

function setTimeout(func: (...args: any[]) => void, time: number, ...args: any[]): Timeout {
  return new Timeout(func, time, ...args);
}

function setInterval(func: (...args: any[]) => void, time: number, ...args: any[]): Interval {
  return new Interval(func, time, ...args);
}

class Timeout {
  time: number;
  timer: number;
  interval: number = 2;
  initialTime: number;
  prevTime: number;
  active: boolean = false;
  endFunction: (...args: any[]) => void;
  args: any[];
  iteration: number = 0;
  constructor(func: (...args: any[]) => void, time: number, ...args: any[]) {
    this.time = time;
    this.endFunction = func;
    this.start();
    this.args = args;
  }
  tick(): void {
    if(!this.active) {
      window.clearInterval(this.timer);
      return;
    }
    const now = performance.now();
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
    window.clearInterval(this.timer);
    this.stop()
    this.endFunction(...this.args);
  }
  stop(): void {
    this.active = false;
  }
}

class Interval extends Timeout {
  constructor(func: () => void, time: number, ...args: any[]) {
    super(func, time, ...args);
  }
  end(): void {
    super.end();
    this.start();
  }
}

export {setTimeout, setInterval, clearTimeout, clearInterval};
export {}
