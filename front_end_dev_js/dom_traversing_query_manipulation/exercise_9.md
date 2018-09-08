# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 9: Work Back

Given the JavaScript code below, create the corresponding HTML that results to the same logs to the console when executed in sequence.

```
> console.log(document.head.childNodes.length);
= 3
> console.log(document.head.children[0].tagName);
= 'TITLE'
> console.log(document.head.textContent);
= "
      Title
    "
> console.log(document.body.children.length);
= 3
> console.log(document.body.childNodes.length);
= 5
> console.log(document.querySelector('div').parentNode.parentNode.tagName);
= 'BODY'
> console.log(document.querySelector('div section').children[2].nextElementSibling);
= null
> console.log(document.querySelectorAll('div').length);
= 1

> var nodeA = document.body.firstElementChild;
> console.log(document.querySelector('footer').children.length);
= 1
> console.log(document.querySelector('body').replaceChild(
>   document.querySelector('footer'), document.body.firstElementChild).tagName);
= 'HEADER'
> console.log(document.body.appendChild(nodeA));
= Header node

> console.log(document.querySelector('section').textContent.split("\n").map(function(text) {
>   return text.trim();
> }).filter(function(text) {
>   return text.length > 0;
> }));
= ["H1", "Hello", "World"]

> console.log(document.querySelector('section').children);
= HTMLCollection(3) [h1, p, p]
> console.log(document.querySelector('section').textContent);
= "
            H1
            Hello
            World
          "

> console.log(document.querySelector('span.emphasis').parentNode.tagName);
= 'FOOTER'
```

### Answer

```
<!doctype html>
<html>
  <head><title>
    Title
  </title><!--has three child nodes -->
  </head>
  <body>
    <header class="">
      <div class="">
        <section>
          <h1 class="">H1</h1>
          <p class="">Hello</p>
          <p class="">World</p>
        </section>
      </div>
    </header><article class="">

    </article><footer class="">
      <span class="emphasis"></span>
    </footer>
  </body>
</html>
```

### Tests

```
console.log(document.head.childNodes.length);
console.log(document.head.children[0].tagName);
console.log(document.head.textContent);
console.log(document.body.children.length);
console.log(document.body.childNodes.length);
console.log(document.querySelector('div').parentNode.parentNode.tagName);
console.log(document.querySelector('div section').children[2].nextElementSibling);
console.log(document.querySelectorAll('div').length);
var nodeA = document.body.firstElementChild;
console.log(document.querySelector('footer').children.length);
console.log(document.querySelector('body').replaceChild(document.querySelector('footer'), document.body.firstElementChild).tagName);
console.log(document.body.appendChild(nodeA));
console.log(document.querySelector('section').textContent.split("\n").map(function(text) {
  return text.trim();
}).filter(function(text) {
  return text.length > 0;
}));
console.log(document.querySelector('section').children);
console.log(document.querySelector('section').textContent);
console.log(document.querySelector('span.emphasis').parentNode.tagName);
```
