# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 1: Randomizer

Write a function, randomizer that accepts n number of callbacks that will be executed at a random point in time. In addition to executing the callbacks, randomizer should also log the elapsed time in seconds. To limit the randomness of the points in time that callbacks will be executed, you may assume that all callbacks should be executed within 2 * number of callbacks seconds.

Here's some sample code as reference on the exepcted outcome:

```
function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(callbacks) {}
randomizer(callback1, callback2, callback3);
// Output:
// 1
// 2
// "callback2"
// "callback3"
// 3
// 4
// 5
// "callback1"
// 6
```

### Answer

```
function randomSeconds(maxSeconds) {
  return Math.floor(Math.random() * maxSeconds) + 1;
};
function createLogTimeout(num) {
  var delay = num * 1000;
  setTimeout(function() {
    console.log(num);
  }, delay);
};
function randomizer(callbacks) {
  var callbackArr = Array.prototype.slice.call(arguments);
  var maxSeconds = callbackArr.length * 2;
  callbackArr.forEach(function(callback) {
    setTimeout(callback, randomSeconds(maxSeconds) * 1000);
  });
  for (var i = 1; i <= maxSeconds; i++) {
    createLogTimeout(i);
  }
};
```

The LS solution uses `setInterval` for the count of each second, which is a neater solution.
