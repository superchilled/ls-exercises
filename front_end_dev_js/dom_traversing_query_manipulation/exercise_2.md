# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 2: Child Nodes

How many direct and indirect child nodes does each parent node — starting with the element with an id of 1 — have in the DOM generated by the following HTML:

```
<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>
```

Consider the following when counting the direct and indirect child nodes for each parent node:

  * Any DOM node that has at least one child node is a parent node.
  * Indirect child nodes are the child nodes of child nodes.

### Answer

`div[id=1]` has 9 direct child nodes: 4 element nodes `h1[id=2]`, `p[id=4]`, `a[id=6]`, and `div[id=8]`, and 5 empty text nodes creatig the 'whitespace' between these element nodes. It has 10 indirect child nodes: `Hello` & `em[id=3]`; 2 text nodes, 3 empty text nodes and `span[id=5]` inside `p[id=4]`; `strong[id=7]`; `p[id=9]`.

`h1[id=2]` has 2 direct child nodes: `Hello` & `em[id=3]`. It has 1 indirect child node: `World` inside `em[id=3]`.

`p[id=4]` has 6 direct child nodes: 2 text nodes, 3 empty text nodes and `span[id=5]`, and `awesome` inside `span[id=5]`.

`a[id=6]` has 1 direct child node: `strong[id=7]`, and 1 indirect child node: `Enter` inside `strong[id=7]`.

`div[id=8]` has 1 direct child node: `p[id=9]`, and 1 indirect child node: `a[id=10]` inside `p[id=9]`.

`a[id=10]` has 1 direct child node: `Go back`, and no indirect child nodes.

## Further Exploration

Write code that returns the number of direct and indirect child nodes for a given parent node as an array.

```
// sample output
> childNodes(1);
= [9, 12]
> childNodes(4);
= [3, 1]
> childNodes(9);
= [1, 1]
```

### Answer

```
function childNodes(nodeId) {
  var parent = document.getElementById(nodeId);
  var directNodes = parent.childNodes.length;
  var indirectNodes = 0;
  Array.prototype.slice.call(parent.childNodes).forEach(function(child) {
    indirectNodes += child.childNodes.length;
  });
  return [directNodes, indirectNodes];
};
```