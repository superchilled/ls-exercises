# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 3: Bold Element + Custom

Implement a function that makes an element bold and allows the user of the function to optionally do something else with it.

```
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Bold Element + Custom</title>
  </head>
  <body>
    <section>Hello World</section>
    <p>Greetings!</p>
  </body>
</html>
```
```
> var domElement = document.querySelector('p');
> makeBold(domElement, function(elem) {
    if (elem.tagName === 'SECTION') {
      elem.classList.add('highlight');
    }
  });

> domElement.classList.contains('highlight');
= false
> domElement.style.fontWeight;
= "bold"

> domElement = document.querySelector('section');
> makeBold(domElement, function(elem) {
    if (elem.tagName === 'SECTION') {
      elem.classList.add('highlight');
    }
  });

> domElement.classList.contains('highlight');
= true
> domElement.style.fontWeight;
= "bold"
```

### Answer

```
function makeBold(elem, callback) {
  elem.style.fontWeight = 'bold';
  callback(elem);
};
```

Note: the LS solution uses a conditional to check if a callback is passed, and that it is of type 'function', before executing the callback.
