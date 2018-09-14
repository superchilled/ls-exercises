# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 8: Delegate Event Function

Implement a function that delegates events on descendant (inner) elements that match a selector to a parent element. The function takes three (4) arguments: parentElement, selector, eventType, and, callback. Assume that all event handlers are listening during the bubbling phase.

Use this markup and the following scenarios to test your implementation:

```
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Event Delegation Function</title>
  </head>
  <body>
    <main>
      <section>
        <h1>Header</h1>
        <p>Content</p>
      </section>
      <aside>
        <h2>Sub Side Notes</h2>
        <p>Note 1</p>
        <p>Note 2</p>
      </aside>
    </main>
    <aside>
      <p>Side Note</p>
    </aside>
  </body>
</html>
```

### Scenarios

Notes on the scenarios:

  * Treat each scenario independently of the other.
  * Assume that the delegateEvent function was just executed before the described scenario

**Scenario 1:** `delegateEvent(element1, 'p', 'click', callback);`

  * The function successfully executes and returns `undefined`
  * No event listeners are added to any element

**Scenario 2:** `delegateEvent(element2, 'p', 'click', callback);`

  * The function successfully executes and returns `true`
  * A click event listener is added to `element2`
  * Clicking anywhere on the page doesn't trigger `callback`

**Scenario 3:** `delegateEvent(element2, 'h1', 'click', callback);`

  * The function successfully executes and returns `true`
  * A click event listener is added to `element2`
  * Clicking anywhere on the page doesn't trigger `callback`

**Scenario 4:** `delegateEvent(element3, 'h1', 'click', callback);`

  * The function successfully executes and returns `true`
  * A click event listener is added to `element3`
  * Clicking the `h1` element with the text "Header" triggers `callback`. The alert box alerts `"Target: H1\nCurrent Target: MAIN"`
  * Clicking an element other than h1 doesn't trigger `callback`

**Scenario 5:** `delegateEvent(element3, 'aside p', 'click', callback);`

  * The function successfully executes and returns `true`
  * A click event listener is added to `element3`
  * Clicking `p` elements that are descendants of `"main aside"` triggers `callback`. The alert box alerts `"Target: P\nCurrent Target: MAIN"`
  * Clicking anywhere else doesn't trigger `callback`

**Scenario 6:** `delegateEvent(element2, 'p', 'click', callback);`

  * The function successfully executes and returns `true`
  * A click event listener is added to `element2`
  * Try clicking before proceeding to the next bullet. Clicking anywhere on the page doesn't trigger `callback`
  * Run this code:
  ```
    var newP = document.createElement('P');
    var newContent = document.createTextNode('New Paragraph');
    newP.appendChild(newContent);

    element2.appendChild(newP);
  ```
  * Clicking the `p` element with text "New Paragraph" triggers `callback`. The alert box alerts `"Target: P\nCurrent Target: H1"`
  * Clicking anywhere else doesn't trigger `callback`

### Answer

```

```
