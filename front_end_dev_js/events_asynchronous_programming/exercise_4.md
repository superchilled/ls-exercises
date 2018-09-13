# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 4: Buggy Code

The code below is buggy. The person who created the code expects that when the user clicks on the image that nothing will happen. This, however, wasn't the case and clicks to the image still brought the user to another web page.

Study the code and explain the bug.

```
<a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg"
</a>
```

```
img {
  display: block;
  width: 15%;
  margin-top: 10px;
  cursor: auto;
}
```

```
document.querySelector('img').addEventListener('click', function(event) {
  event.stopPropagation();
}, false);
```

### Answer

`stopPropagation()` stops the event from bubbling beyond the `img` element, it doesn't prevent the default action of clicking on the link; for that you need to use `preventDefault()`.

```
document.querySelector('img').addEventListener('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
}, false);
```
