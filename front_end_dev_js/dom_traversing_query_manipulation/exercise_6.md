# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 6: Node Swap

Write a function that takes two element ids as arguments and swaps the positions of the elements represented by the ids. The function returns true for valid swaps and undefined for invalid. To put the focus on the node swapping functionality, you can assume that nodes will have a value for the id attribute and two arguments will always be provided. Use the following HTML and sample codes to test your output:

```
<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="2"></div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>
```

**Invalid Swaps**

```
// at least one of the id attributes doesn't exist
> nodeSwap(1, 20);
= undefined

// at least one of the nodes is a "child" of the other
> nodeSwap(1, 4);
= undefined
> nodeSwap(9, 3);
= undefined
```

**Valid Swaps**

```
// one swap
> nodeSwap(1, 2);
```

```
<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="2"></div>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>
```

```
// multiple swaps
> nodeSwap(3, 1);
> nodeSwap(7, 9);
```

```
<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="3">
      <div id="9"></div>
      <div id="8"></div>
      <div id="7"></div>
    </div>
    <div id="2"></div>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
  </body>
</html>
```

### Answer

```
function getAncestorIds(elementNode) {
  var ancestorIds = [];
  var currentNode = elementNode.parentElement;
  while (currentNode.nodeName !== 'BODY') {
    ancestorIds.push(currentNode.id);
    currentNode = currentNode.parentElement;
  }
  return ancestorIds;
};
function nodeSwap(firstNodeId, secondNodeId) {
  var firstNode = document.getElementById(firstNodeId);
  var secondNode = document.getElementById(secondNodeId);
  // check both nodes are not null
  if (!(firstNode && secondNode)) { return undefined }
  // check nodes are not nested inside each other
  var firstNodeAscIds = getAncestorIds(firstNode);
  var secondNodeAscIds = getAncestorIds(secondNode);
  if (
    firstNodeAscIds.includes(String(secondNodeId))
    || secondNodeAscIds.includes(String(firstNodeId))
  ) { return undefined }
  // swap nodes
  var firstNodePlaceholder = document.createElement('DIV');
  // firstNodePlaceholder.id = 'first-node-placeholder';
  var secondNodePlaceholder = document.createElement('DIV');
  // secondNodePlaceholder.id = 'second-node-placeholder';
  firstNode.insertAdjacentElement("afterend", firstNodePlaceholder);
  secondNode.insertAdjacentElement("afterend", secondNodePlaceholder);
  firstNodePlaceholder.insertAdjacentElement("afterend", secondNode);
  secondNodePlaceholder.insertAdjacentElement("afterend", firstNode);
  firstNodePlaceholder.remove();
  secondNodePlaceholder.remove();
  return true;
};
```
