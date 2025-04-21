function createSetIntervalPolyfill() {
  // clousre
  let intervalID = 0;
  const intervalMap = {};

  function setIntervalPolyfill(callbackFn, delay = 0, ...args) {
    if (typeof callbackFn !== "function") {
      throw new TypeError("callback should be a function");
    }

    // Unique
    const id = intervalID++;

    function repeat() {
      intervalMap[id] = setTimeout(() => {
        callbackFn(...args);

        if (intervalMap[id]) {
          repeat();
        }
      }, delay);
    }

    repeat();

    return id;
  }

  function clearIntervalPolyfill(intervalID) {
    clearTimeout(intervalMap[intervalID]);
    delete intervalMap[intervalID];
  }

  return {
    setIntervalPolyfill,
    clearIntervalPolyfill,
  };
}

const { setIntervalPolyfill, clearIntervalPolyfill } =
  createSetIntervalPolyfill();

// Testing
let counter = 0;
let intervalID;
function greeting() {
  counter++;
  console.log("Hello, Ibrar Munir");
  if (counter >= 3) {
    clearIntervalPolyfill(intervalID);
  }
}

intervalID = setIntervalPolyfill(greeting, 1000);
