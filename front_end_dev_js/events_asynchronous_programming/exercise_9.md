# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 9: Events Tracker

Implement a function that tracks user events that occur on web page by wrapping the callback function argument passed to the addEventListener method so that every time the listener is fired the event is logged in a tracker object. Use the following markup and sample scenario below as reference for the expected behavior of the tracker object.

```
<html>
  <head>
    <title>Tests</title>
    <meta charset="utf-8">
    <style>
     #red, #blue, #green, #orange {
         cursor: pointer;
         color: white;
         padding: 10px;
         margin: 10px;
     }
     #red {
         width: 400px;
         height: 400px;
         background: red;
     }

     #blue {
         width: 200px;
         height: 200px;
         background: blue;
     }

     #orange {
         width: 100px;
         height: 100px;
         background: orange;
     }

     #green {
         width: 50px;
         height: 50px;
         background: green;
     }
    </style>
  </head>
  <body>
    <div id="red">Red
      <div id="blue">Blue</div>
      <div id="orange">Yellow
        <div id="green">Green</div>
      </div>
    </div>
    <script src="test.js"></script>
  </body>
</html>
```

### Scenario

**Assumptions**

  * Assume that the elements, with the respective ids, are clicked in the following order: `div#blue`, `div#red`, `div#yellow`, and `div#green`.
  * The elements that were clicked all have the following "click" event listeners attached to them:

```
divRed.addEventListener('click', track(function() {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(function() {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(function() {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(function() {
  document.body.style.background = 'green';
}));
```

```
> tracker.list().length;
= 4
> tracker.elements();
= [div#blue, div#red, div#yellow, div#green]
> tracker.elements()[0] === document.querySelector('#blue');
= true
> tracker.elements()[3] === document.querySelector('#green');
= true
> tracker.clear();
= 0
> tracker.list();
= []
> tracker.list()[0] = 'abc'
> tracker.list().length;
= 0
```

### Answer

```
var tracker = {
  elems: [],
  list: function() {
    return this.elems.filter(elem => elem instanceof Event);
  },
  elements: function() {
    return this.elems.map(elem => elem.target);
  },
  clear: function() {
    this.elems.length = 0;
    return this.elems.length;
  },
};

function track(callback) {
  return function(event) {
    event.stopPropagation();
    tracker.elems.push(event);
  };
};
```
