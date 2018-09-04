# LS Exercises - Front-end Development with JavaScript | DOM Traversing, Querying, and Manipulation

## Exercise 1: Counting Nodes

Go over the two HTML snippets. How many nodes will the resulting DOM tree have?

```
<div>
  <p>Then press the <em>Draw</em> button</p>
</div>
```

```
<div><p>Then press the <em>Draw</em> button.</p></div>
```

### Answer

Once missing markup (such as `<html>`, `<head>` and `<body>` tags are added back in by the browser, the first snippet will have 11 nodes:

```
html
head
body
div
  text: ws
   p
    text
      em
        text
    text
  text: ws
```

and the second will have 9 nodes (due to the missing empty text (whitespace) nodes):

```
html
head
body
div
p
text
  em
    text
text
```
