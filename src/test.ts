import * as tick from "./tick.mts";

function foo() {
  console.log("bar")
}

let baz = tick.setTimeout(foo, 500);
