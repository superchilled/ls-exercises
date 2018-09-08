# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 8: Array to Nodes

Implement a function that converts a nested array of `nodeNames` (see Nodes to Array exercise for examples) into an actual DOM. Go over the sample code and expected output below as a guide for what you will implement.

### Example 1

```
// Nested array of nodes
var nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

arrayToNodes(nodes);
```

```
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

### Example 2

```
// Nested array of nodes
var nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];

// OR
//
// ["BODY", [
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", [
//       ["DIV",[]]]]]],
//   ["DIV", []],
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", []],
//     ["DIV", []]]]]]

arrayToNodes(nodes);
```

```
<body>
  <div>
    <div></div>
    <div>
      <div></div>
    </div>
  </div>
  <div></div>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>
```

### Answer

```
function arrayToNodes(nodes, parent) {
  var parent = parent || document.documentElement;
  nodes.forEach(function(elem) {
    if (Array.isArray(elem)) {
      arrayToNodes(elem, parent);
    } else {
      var newElem = document.createElement(elem);
      if (elem === 'BODY' && document.body) {
        document.documentElement.replaceChild(newElem, document.body);
      } else {
        parent.appendChild(newElem);
      }
      parent = newElem;
    }
  });
};
```
