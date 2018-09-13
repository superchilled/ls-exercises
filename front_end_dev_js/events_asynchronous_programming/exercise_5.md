# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 5: Context Menus

Given the following markup, implement distinct context menus for the main and the sub areas of the web page. You can represent a context menu as an alert box that displays the name of the respective area (i.e., alert("sub")). Only one context menu should appear when the event occurs.

```
<main>
  Main Area
  <section id="sub">
    Sub Area
  </section>
</main>
```

```
main, #sub {
  padding: 15px;
}
main {
  width: 100%;
  height: 200px;
  background: blue;
  color: white;
}

#sub {
  position: relative;
  top: 100px;
  left: 15px;
  background: red;
  height: 50px;
  width: 50%;
}
```

### Answer

```
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  event.stopPropagation();
  var name = event.target.textContent.trim().toLowerCase().split(' ')[0];

  alert(name);
});
```
