# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 7: Article Highlighter

Given the HTML and CSS from the codepen, implement JS code that does the following:

```
<header>
  <h1>Nav</h1>
  <ul>
    <li><a href="#article-1">Article 1</a></li>
    <li><a href="#article-2">Article 2</a></li>
    <li><a href="#article-3">Article 3</a></li>    
    <li><a href="#article-4">Article 4</a></li>
  </ul>
</header>
<main>
  <h1>Articles</h1>
  <article id="article-1">
    <h2>Article 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius pulvinar aliquam. Suspendisse sed metus vel diam pulvinar lacinia. Mauris odio ante, volutpat vitae arcu sit amet, sodales iaculis nibh. Morbi tincidunt, est non pharetra finibus, risus eros rhoncus velit, et eleifend ligula erat quis odio. Pellentesque sit amet nulla lacus. Fusce mollis aliquet ex vitae pellentesque. Suspendisse ex velit, eleifend in porta vel, porttitor a felis. Vivamus vestibulum, nulla ut iaculis dapibus, eros nisl molestie elit, at viverra neque arcu vel tellus. Vestibulum sed eros purus.

Donec rhoncus commodo lorem. Ut id porta massa. Etiam accumsan risus eget nunc convallis convallis. Etiam eleifend metus vel libero aliquet, non convallis velit pellentesque. Maecenas vitae posuere libero. Nullam maximus sagittis metus vitae condimentum. Praesent rutrum scelerisque vulputate. Suspendisse egestas dui magna, a tempus turpis placerat vel. Integer venenatis varius feugiat. Quisque a diam eget ex lacinia porttitor. Aliquam congue sapien in tempor accumsan. Morbi sollicitudin est eget ipsum eleifend, et vestibulum risus fringilla. Vestibulum fringilla nibh est, lacinia commodo justo mollis ac. Cras vestibulum odio in varius vehicula. Praesent at sodales nisl.

Phasellus elit enim, fermentum et finibus ut, commodo non lorem. Aliquam bibendum sapien at arcu semper, eget ultrices elit lacinia. In sed nulla quis massa sagittis cursus eu tempor odio. Nulla at imperdiet ex. Maecenas hendrerit ornare dui, nec porta dolor aliquam quis. Curabitur sollicitudin enim vel vulputate suscipit. Quisque vitae lobortis velit. Maecenas a dui pretium, suscipit elit non, gravida odio. Etiam feugiat a turpis vitae sagittis. Etiam ac nulla id metus semper aliquam eget vitae justo. Vivamus sed odio ornare, commodo tortor eget, pretium metus. Sed a aliquam ligula. Nullam a quam dui. Cras hendrerit viverra nisi, et faucibus orci elementum at.</p>
  </article>
  <article id="article-2">
    <h2>Article 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius pulvinar aliquam. Suspendisse sed metus vel diam pulvinar lacinia. Mauris odio ante, volutpat vitae arcu sit amet, sodales iaculis nibh. Morbi tincidunt, est non pharetra finibus, risus eros rhoncus velit, et eleifend ligula erat quis odio. Pellentesque sit amet nulla lacus. Fusce mollis aliquet ex vitae pellentesque. Suspendisse ex velit, eleifend in porta vel, porttitor a felis. Vivamus vestibulum, nulla ut iaculis dapibus, eros nisl molestie elit, at viverra neque arcu vel tellus. Vestibulum sed eros purus.

Donec rhoncus commodo lorem. Ut id porta massa. Etiam accumsan risus eget nunc convallis convallis. Etiam eleifend metus vel libero aliquet, non convallis velit pellentesque. Maecenas vitae posuere libero. Nullam maximus sagittis metus vitae condimentum. Praesent rutrum scelerisque vulputate. Suspendisse egestas dui magna, a tempus turpis placerat vel. Integer venenatis varius feugiat. Quisque a diam eget ex lacinia porttitor. Aliquam congue sapien in tempor accumsan. Morbi sollicitudin est eget ipsum eleifend, et vestibulum risus fringilla. Vestibulum fringilla nibh est, lacinia commodo justo mollis ac. Cras vestibulum odio in varius vehicula. Praesent at sodales nisl.

Phasellus elit enim, fermentum et finibus ut, commodo non lorem. Aliquam bibendum sapien at arcu semper, eget ultrices elit lacinia. In sed nulla quis massa sagittis cursus eu tempor odio. Nulla at imperdiet ex. Maecenas hendrerit ornare dui, nec porta dolor aliquam quis. Curabitur sollicitudin enim vel vulputate suscipit. Quisque vitae lobortis velit. Maecenas a dui pretium, suscipit elit non, gravida odio. Etiam feugiat a turpis vitae sagittis. Etiam ac nulla id metus semper aliquam eget vitae justo. Vivamus sed odio ornare, commodo tortor eget, pretium metus. Sed a aliquam ligula. Nullam a quam dui. Cras hendrerit viverra nisi, et faucibus orci elementum at.</p>
  </article>
  <article id="article-3">
    <h2>Article 3</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius pulvinar aliquam. Suspendisse sed metus vel diam pulvinar lacinia. Mauris odio ante, volutpat vitae arcu sit amet, sodales iaculis nibh. Morbi tincidunt, est non pharetra finibus, risus eros rhoncus velit, et eleifend ligula erat quis odio. Pellentesque sit amet nulla lacus. Fusce mollis aliquet ex vitae pellentesque. Suspendisse ex velit, eleifend in porta vel, porttitor a felis. Vivamus vestibulum, nulla ut iaculis dapibus, eros nisl molestie elit, at viverra neque arcu vel tellus. Vestibulum sed eros purus.

Donec rhoncus commodo lorem. Ut id porta massa. Etiam accumsan risus eget nunc convallis convallis. Etiam eleifend metus vel libero aliquet, non convallis velit pellentesque. Maecenas vitae posuere libero. Nullam maximus sagittis metus vitae condimentum. Praesent rutrum scelerisque vulputate. Suspendisse egestas dui magna, a tempus turpis placerat vel. Integer venenatis varius feugiat. Quisque a diam eget ex lacinia porttitor. Aliquam congue sapien in tempor accumsan. Morbi sollicitudin est eget ipsum eleifend, et vestibulum risus fringilla. Vestibulum fringilla nibh est, lacinia commodo justo mollis ac. Cras vestibulum odio in varius vehicula. Praesent at sodales nisl.

Phasellus elit enim, fermentum et finibus ut, commodo non lorem. Aliquam bibendum sapien at arcu semper, eget ultrices elit lacinia. In sed nulla quis massa sagittis cursus eu tempor odio. Nulla at imperdiet ex. Maecenas hendrerit ornare dui, nec porta dolor aliquam quis. Curabitur sollicitudin enim vel vulputate suscipit. Quisque vitae lobortis velit. Maecenas a dui pretium, suscipit elit non, gravida odio. Etiam feugiat a turpis vitae sagittis. Etiam ac nulla id metus semper aliquam eget vitae justo. Vivamus sed odio ornare, commodo tortor eget, pretium metus. Sed a aliquam ligula. Nullam a quam dui. Cras hendrerit viverra nisi, et faucibus orci elementum at.</p>
  </article>
  <article id="article-4">
    <h2>Article 4</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius pulvinar aliquam. Suspendisse sed metus vel diam pulvinar lacinia. Mauris odio ante, volutpat vitae arcu sit amet, sodales iaculis nibh. Morbi tincidunt, est non pharetra finibus, risus eros rhoncus velit, et eleifend ligula erat quis odio. Pellentesque sit amet nulla lacus. Fusce mollis aliquet ex vitae pellentesque. Suspendisse ex velit, eleifend in porta vel, porttitor a felis. Vivamus vestibulum, nulla ut iaculis dapibus, eros nisl molestie elit, at viverra neque arcu vel tellus. Vestibulum sed eros purus.

Donec rhoncus commodo lorem. Ut id porta massa. Etiam accumsan risus eget nunc convallis convallis. Etiam eleifend metus vel libero aliquet, non convallis velit pellentesque. Maecenas vitae posuere libero. Nullam maximus sagittis metus vitae condimentum. Praesent rutrum scelerisque vulputate. Suspendisse egestas dui magna, a tempus turpis placerat vel. Integer venenatis varius feugiat. Quisque a diam eget ex lacinia porttitor. Aliquam congue sapien in tempor accumsan. Morbi sollicitudin est eget ipsum eleifend, et vestibulum risus fringilla. Vestibulum fringilla nibh est, lacinia commodo justo mollis ac. Cras vestibulum odio in varius vehicula. Praesent at sodales nisl.

Phasellus elit enim, fermentum et finibus ut, commodo non lorem. Aliquam bibendum sapien at arcu semper, eget ultrices elit lacinia. In sed nulla quis massa sagittis cursus eu tempor odio. Nulla at imperdiet ex. Maecenas hendrerit ornare dui, nec porta dolor aliquam quis. Curabitur sollicitudin enim vel vulputate suscipit. Quisque vitae lobortis velit. Maecenas a dui pretium, suscipit elit non, gravida odio. Etiam feugiat a turpis vitae sagittis. Etiam ac nulla id metus semper aliquam eget vitae justo. Vivamus sed odio ornare, commodo tortor eget, pretium metus. Sed a aliquam ligula. Nullam a quam dui. Cras hendrerit viverra nisi, et faucibus orci elementum at.</p>
  </article>
</main>
```

```
.highlight {
  border: 1px dotted black;
}

header li {
  display: inline-block;
}

header ul {
  padding: 0;
}
```


  * When the user clicks on a "Nav" link (Article 1 to 4) the browser scrolls to the particular `article` element and adds the `highlight` class to it. If another element has `highlight` as part of its class attribute, the browser removes it.
  * When a user clicks on an `article` element or any of its child elements, the browser adds the `highlight` class to it. If another element has `highlight` as part of its class attribute, the browser removes it.
  * When the user clicks anywhere outside of a specific `article` element and its child elements, the browers adds the `highlight` class to the `main` element containing all four (4) articles. If another element has `highlight` as part of its class attribute, the browser removes it.

### Answer

```
// add event listener to 'nav' element. When clicked:
  // remove 'highlight' class from all elements with 'highlight' class
  // get the href value
  // get the element with the id of the href
  // add the 'highlight' class to the element
// add event listener to all article elements, to fire on the capturing phase and stop propogation. when clicked:
  // remove 'highlight' class from all elements with 'highlight' class
  // add 'highlight' class to 'currentTarget'
// add event listener to body. when clicked:
  // remove 'highlight' class from all elements with 'highlight' class
  // add 'highlight' class to 'main' element

function removeHighlights() {
  var highlightedElems = document.querySelectorAll('.highlight');
  Array.prototype.slice.call(highlightedElems).forEach(function(elem) {
    elem.classList.remove('highlight');
  });
}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('ul').addEventListener('click', function(event) {
    var clickedElem = event.target;
    if (clickedElem.tagName === 'A') {
      removeHighlights();
      var articleId = clickedElem.getAttribute('href').slice(1);
      document.getElementById(articleId).classList.add('highlight');
    }
  });
  Array.prototype.slice.call(document.getElementsByTagName('ARTICLE')).forEach(function(articleElem) {
    articleElem.addEventListener('click', function(event) {
      event.stopPropagation();
      removeHighlights();
      event.currentTarget.classList.add('highlight');
    });
  });
  document.body.addEventListener('click', function(event) {
    if (event.target.tagName !== 'A') {
      removeHighlights();
      document.querySelector('main').classList.add('highlight');
    }
  });
});
```
