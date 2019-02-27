function createMakesList() {
  var makesList = [...new Set(filteredCars.map(car => car.make))];
  makesList.unshift('All');
  return makesList;
}

function createModelsList() {
  var modelsList = [...new Set(filteredCars.map(car => car.model))];
  modelsList.unshift('All');
  return modelsList;
}

function createPricesList() {
  var pricesList = [...new Set(filteredCars.map(car => car.price))].sort((a, b) => a - b);
  pricesList.unshift('Any');
  return pricesList;
}

function createYearsList() {
  var yearsList = [...new Set(filteredCars.map(car => car.year))].sort((a, b) => a - b);
  yearsList.unshift('Any');
  return yearsList;
}

function filterMake(make) {
  return function(car) {
    if (make === 'All') {
      return true;
    } else {
      return car.make === make;
    }
  }
};

function filterModel(model) {
  return function(car) {
    if (model === 'All') {
      return true;
    } else {
      return car.model === model;
    }
  }
};

function filterPrice(price) {
  return function(car) {
    if (price === 'Any') {
      return true;
    } else {
      return car.price <= Number(price);
    }
  }
};

function filterYear(year) {
  return function(car) {
    if (year === 'Any') {
      return true;
    } else {
      return car.year === Number(year);
    }
  }
};

function filterCars(make, model, price, year) {
  return cars.filter(filterMake(make)).filter(filterModel(model))
             .filter(filterPrice(price)).filter(filterYear(year));
};

var cars = [
  { make: 'Honda', image: 'img/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'img/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'img/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'img/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'img/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'img/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'img/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

var filteredCars = cars;

var makes = createMakesList();
var models = createModelsList();
var prices = createPricesList();
var years = createYearsList();

var selectedMake;
var selectedModel;
var selectedPrice;
var selectedYear;

$(function() {
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

  $('select').on('change', function(event) {
    selectedMake = $("select[name='make'] option:selected").val();
    selectedModel = $("select[name='model'] option:selected").val();
    selectedPrice = $("select[name='price'] option:selected").val();
    selectedYear = $("select[name='year'] option:selected").val();
    filteredCars = filterCars(selectedMake, selectedModel, selectedPrice, selectedYear);
    makes = createMakesList();
    models = createModelsList();
    prices = createPricesList();
    years = createYearsList();
    $makeOptions.html(dropdownOptionsTemplateFunc({ options: makes })).val(selectedMake);
    $modelOptions.html(dropdownOptionsTemplateFunc({ options: models })).val(selectedModel);
    $priceOptions.html(dropdownOptionsTemplateFunc({ options: prices })).val(selectedPrice);
    $yearOptions.html(dropdownOptionsTemplateFunc({ options: years })).val(selectedYear);
  });

  $form.on('submit', function(event) {
    event.preventDefault();

    $carsList.html(carsListTemplateFunc({ cars: filteredCars }));
  });
});
