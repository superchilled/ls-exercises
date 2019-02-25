$(function() {
  function removeTodoItem(dataId) {
    var index = todo_items.map(function(e) { return e.id; }).indexOf(Number(dataId));
    if (index > -1) {
      todo_items.splice(index, 1);
    }
    console.log(todo_items);
  };

  var todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ];

  var $list = $('#todo-list');
  var $currentListItem;
  var $modal = $('#modal');
  var $modalLayer = $('#modal_layer');
  var $modalYesButton = $modal.find("button[name='Yes']");
  var $modalNoButton = $modal.find("button[name='No']");

  $modalYesButton.on('click', function(event) {
    var currentListItemId = $currentListItem.attr('data-id');
    $currentListItem.remove();
    $modal.addClass('hidden');
    $modalLayer.addClass('hidden');
    removeTodoItem(currentListItemId);
  });

  $modalNoButton.on('click', function(event) {
    $modal.addClass('hidden');
    $modalLayer.addClass('hidden');
  });

  var $listTemplate = $('#todo-list-template').remove();
  var $itemTemplate = $('#todo-item-template').remove();
  var listTemplateFunc = Handlebars.compile($listTemplate.html());
  var itemTemplateFunc = Handlebars.compile($itemTemplate.html());
  Handlebars.registerPartial('todo', itemTemplateFunc);

  $list.append(listTemplateFunc({ todos: todo_items }));

  $('.remove').on('click', function(event) {
    $currentListItem = $(this).parent('li');
    $modal.removeClass('hidden');
    $modalLayer.removeClass('hidden');
  });
});
