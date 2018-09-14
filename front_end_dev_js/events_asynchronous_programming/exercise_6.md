# LS Exercises - Front-end Development with JavaScript | Events and Asynchronous Programming

## Exercise 6: Selection Filters

Given the HTML below, write JS code that updates the options on one dropdown every time the selection in the other dropdown changes. For instance, when the user chooses an option other than the one currently displayed in the left dropdown (i.e., "Classifications"), then the options on the dropdown to the right of it should change accordingly. Use the lookup table that follows for what the available options should be given a selection change in one of the dropdowns.

```
<form id="selection-filters" method="post" action="#">
  <select id="animal-classifications">
    <option value="Classifications" selected>Classifications</option>
    <option value="Vertebrate">Vertebrate</option>
    <option value="Warm-blooded">Warm-blooded</option>
    <option value="Cold-blooded">Cold-blooded</option>
    <option value="Mammal">Mammal</option>
    <option value="Bird">Bird</option>
  </select>
  <select id="animals">
    <option value="Animals" selected>Animals</option>
    <option value="Bear">Bear</option>
    <option value="Tturtle">Turtle</option>
    <option value="Whale">Whale</option>
    <option value="Salmon">Salmon</option>
    <option value="Ostrich">Ostrich</option>    
  </select>
  <button id="clear">Clear</button>  
</form>
```

**Selection Change with Filter1: Animal Classifications**

| Selection |	Animals Options |
|---|---|
| Vertebrate |	Bear, Turtle , Whale, Salmon, Ostrich |
| Warm-blooded |	Bear, Whale, Ostrich |
| Cold-blooded |	Salmon, Turtle |
| Mammal |	Bear, Whale |
| Bird |	Ostrich |

**Selection Change with Filter2: Animals**

| Selection | 	Animal Classifications Options |
|---|---|
| Bear | 	Vertebrate, Warm-blooded, Mammal |
| Turtle | 	Vertebrate, Cold-blooded |
| Whale | 	Vertebrate, Warm-blooded, Mammal |
| Salmon | 	Vertebrate, Cold-blooded |
| Ostrich | Vertebrate, Warm-blooded, Bird |

Correspondingly, clicking on the "clear" button resets to the default values in the provided HTML.

### Answer

```
// create a 'animal' objects, with a classification property containing the classifications for that animal
// add all the animal objects to an animals array
// add event listener on classifications select list. when fired:
  // get the value
  // get the option list nodes for the animals select list
  // filter the animals array and map to animal name
  // iterate the animals node list and add style of 'visibility: none' to any node where the value is in the mapped array
// add an event listener to the animals select list
  // get the value
  // get the option list nodes for the classifications select list
  // filter the animals array to the speccific animal and get the classifications for that animal
  // iterate the classifications node list and add style of 'visibility: none' to any node where the value is in the classifications for the animal
// Reset: iterate through the options lists and remove the style.
var bear = { name: 'Bear', classifications: ['Vertebrate', 'Warm-blooded', 'Mammal'] };
var turtle = { name: 'Turtle', classifications: ['Vertebrate', 'Cold-blooded'] };
var whale = { name: 'Whale', classifications: ['Vertebrate', 'Warm-blooded', 'Mammal'] };
var salmon = { name: 'Salmon', classifications: ['Vertebrate', 'Cold-blooded'] };
var ostrich = { name: 'Ostrich', classifications: ['Vertebrate', 'Warm-blooded', 'Bird'] };
var animals = [bear, turtle, whale, salmon, ostrich];
document.addEventListener('DOMContentLoaded', function() {
  var optionNodes = document.querySelectorAll('option');
  var optionNodesArr = Array.prototype.slice.call(optionNodes);
  var classificationsMenu = document.getElementById('animal-classifications');
  var animalsMenu = document.getElementById('animals');
  var resetButton = document.getElementById('clear');

  classificationsMenu.addEventListener('change', function(event) {
    var selectVal = event.target.value;
    var selectedAnimals = animals.filter(function(animal) {
      return animal.classifications.includes(selectVal);
    }).map(animal => animal.name);
    var animalOptionNodes = optionNodesArr.filter(function(optionNode) {
      return optionNode.parentNode.id === 'animals';
    });
    animalOptionNodes.forEach(function(node) {
      if (!selectedAnimals.includes(node.value)) {
        node.classList.add('hidden');
      }
    });
  });

  animalsMenu.addEventListener('change', function(event) {
    var selectVal = event.target.value;
    var selectedAnimal = animals.filter(function(animal) {
      return animal.name === selectVal;
    })[0];
    var selectedClassifications = selectedAnimal.classifications;
    var classificationsOptionNodes = optionNodesArr.filter(function(optionNode) {
      return optionNode.parentNode.id === 'animal-classifications';
    });
    classificationsOptionNodes.forEach(function(node) {
      if (!selectedClassifications.includes(node.value)) {
        node.classList.add('hidden');
      }
    });
  });

  resetButton.addEventListener('click', function(event) {
    optionNodes.forEach(function(node) {
      node.classList.remove('hidden');
    });
  });
});
```
