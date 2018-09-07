# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 5: Coloring

Write a function that colors a specific generation of the DOM tree. A generation is a set of elements that are on the same level of indentation. We'll be using a ["styled" version](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/dom_querying_manipulation/tracing_the_dom_tree_styled.html) of the following HTML for this exercise to better visualize the generations. You may use the `.generation-color` class to color the specific generation. You can assume that only non-negative integers will be provided as arguments. Following are some sample output to help you test your code:

```
<!doctype html>
<html>

<head>
  <title>Coloring</title>
  <link href="style.css" rel="stylesheet">
</head>

<body>
  <article id="1">1
    <header id="2">2
      <span id="3">3
        <a href="#" id="4">4</a>
      </span>
    </header>
    <main id="5">5
      <section id="6">6
        <p id="7">7
          <span id="8">8
            <strong id="9">9
              <a href="#" id="10">10</a>
            </strong>
          </span>
        </p>
      </section>
      <section id="11">11
        <p id="12">12
          <span id="13">13
            <strong id="14">14
              <a href="#" id="15">15</a>
            </strong>
          </span>
        </p>
        <p id="16">16
          <span id="17">17
            <strong id="18">18
              <a href="#" id="19">19</a>
            </strong>
          </span>
          <span id="20">20
            <strong id="21">21
              <a href="#" id="22">22</a>
            </strong>
          </span>
        </p>
      </section>
    </main>
    <footer id="23">23
      <p id="24">24</p>
    </footer>
  </article>
</body>

</html>
```

### Answer

```
function colorGeneration(targetLevel) {
  var currentLevel = 1;
  var currentElements = Array.prototype.slice.call(document.body.children);
  while (currentLevel !== targetLevel) {
    if (currentElements.length > 0) {
      var newLevel = [];
      var childElements;
      currentElements.forEach(function(element) {
        childElements = Array.prototype.slice.call(element.children);
        newLevel = newLevel.concat(childElements);
      });
      currentElements = newLevel;
      currentLevel++;
    } else {
      break;
    }
  }
  currentElements.forEach(function(element) {
    element.classList.add('generation-color');
  });
};
```
