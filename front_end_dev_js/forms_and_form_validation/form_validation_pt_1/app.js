function validateFirstName() {

}

$(function() {
  var $errorMessageTemplate = $('#error').remove();
  var errorMessageTemplateFunc = Handlebars.compile($errorMessageTemplate.html());

  $('input').on('blur', function(event) {
    $(this).parent('label').append(errorMessageTemplateFunc({ message: 'blah' }));
    $(this).parent('label').css({'padding-bottom: 0em'});
  });

  $('input').on('focus', function(event) {
    $(this).parent('label').children('p').remove();
    $(this).parent('label').css({'padding-bottom: 2em'});
  });
});
