var cars = [
  { make: 'Honda', image: 'img/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'img/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'img/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'img/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'img/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'img/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'img/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

$(function() {
  function filterCars(make, model, price, year) {
    return cars.filter(function(car) {
      if (make === 'all') {
        return true;
      } else {
        return car.make === make;
      }
    }).filter(function(car) {
      if (model === 'all') {
        return true;
      } else {
        return car.model === model;
      }
    }).filter(function(car) {
      if (price === 'any') {
        return true;
      } else {
        return car.price <= Number(price);
      }
    }).filter(function(car) {
      if (year === 'any') {
        return true;
      } else {
        return car.year === Number(year);
      }
    });
  };

  var makes = [...new Set(cars.map(car => car.make))];
  var models = [...new Set(cars.map(car => car.model))];
  var prices = [...new Set(cars.map(car => car.price))].sort((a, b) => a - b);
  var years = [...new Set(cars.map(car => car.year))].sort((a, b) => a - b);

  var $carsList = $('#cars-list');
  var $makeOptions = $("select[name='make']");
  var $modelOptions = $("select[name='model']");
  var $priceOptions = $("select[name='price']");
  var $yearOptions = $("select[name='year']");
  var $form = $('#filter-form');

  var $carsListTemplate = $('#cars-list-template').remove();
  var $carListingTemplate = $('#car-listing-template').remove();
  var $dropdownOptionsTemplate = $('#dropdown-options-template').remove();
  var $dropdownOptionTemplate = $('#dropdown-option-template').remove();
  var carsListTemplateFunc = Handlebars.compile($carsListTemplate.html());
  var carListingTemplateFunc = Handlebars.compile($carListingTemplate.html());
  var dropdownOptionsTemplateFunc = Handlebars.compile($dropdownOptionsTemplate.html());
  var dropdownOptionTemplateFunc = Handlebars.compile($dropdownOptionTemplate.html());
  Handlebars.registerPartial('car', carListingTemplateFunc);
  Handlebars.registerPartial('option', dropdownOptionTemplateFunc);

  $carsList.append(carsListTemplateFunc({ cars: cars }));
  $makeOptions.append(dropdownOptionsTemplateFunc({ options: makes }));
  $modelOptions.append(dropdownOptionsTemplateFunc({ options: models }));
  $priceOptions.append(dropdownOptionsTemplateFunc({ options: prices }));
  $yearOptions.append(dropdownOptionsTemplateFunc({ options: years }));

  $form.on('submit', function(event) {
    event.preventDefault();
    var selectedMake = $("select[name='make'] option:selected").val();
    var selectedModel = $("select[name='model'] option:selected").val();
    var selectedPrice = $("select[name='price'] option:selected").val();
    var selectedYear = $("select[name='year'] option:selected").val();
    var filteredCars = filterCars(selectedMake, selectedModel, selectedPrice, selectedYear);
    console.log(filteredCars);
    $carsList.html(carsListTemplateFunc({ cars: filteredCars }));
  });
});
