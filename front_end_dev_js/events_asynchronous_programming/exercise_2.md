# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 2: Reverse Engineer

Study the JavaScript code below and the refactor it such that the same behavior is achieved but without the use of `event.stopPropagation`:

```
document.querySelector('html').addEventListener('click', function() {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', function(event) {
  event.stopPropagation();
});
```

### Answer

```
document.querySelector('html').addEventListener('click', function(event) {
  var containerElem = document.querySelector('#container')

  if (!containerElem.parentElement.contains(event.target)) {
    containerElem.style = 'display: none';
  }
});
```
