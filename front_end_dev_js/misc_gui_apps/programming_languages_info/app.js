function getFullText(title, texts) {
  var filtered = texts.filter(function(textObj) {
    return textObj.name === title;
  })[0];
  return filtered.description;
};

function truncateText(text) {
  return text.slice(0, 200) + '...';
};

$(function() {
  var programmingLanguages = [
    {
      name: 'Ruby',
      description: 'Ruby is a dynamic, reflective, object-oriented, ' +
      'general-purpose programming language. It was designed and developed in the mid-1990s ' +
      'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
      'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
      'including functional, object-oriented, and imperative. It also has a dynamic type ' +
      'system and automatic memory management.'
    },

    {
      name: 'JavaScript',
      description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
      'programming language. It has been standardized in the ECMAScript language ' +
      'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
      'technologies of World Wide Web content production; the majority of websites employ ' +
      'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
      'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
      'supporting object-oriented, imperative, and functional programming styles.'
    },

    {
      name: 'Lisp',
      description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
      'with a long history and a distinctive, fully parenthesized prefix notation. ' +
      'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
      'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
      'since its early days, and many dialects have existed over its history. Today, the best '+
      'known general-purpose Lisp dialects are Common Lisp and Scheme.'
    }
  ];

  var $articlesTemplate = $('#articles-template').remove();
  var articlesTemplateFunc = Handlebars.compile($articlesTemplate.html());
  var $articleTemplate = $('#article-template').remove();
  var articleTemplateFunc = Handlebars.compile($articleTemplate.html());
  Handlebars.registerPartial('article', articleTemplateFunc);
  Handlebars.registerHelper('truncated', function(text) {
    return text.slice(0, 200);
  });
  Handlebars.registerHelper('truncated', truncateText);

  $('#languages').append(articlesTemplateFunc({ articles: programmingLanguages }));

  $('#languages').on('click', 'button', function() {
    var $currentButton = $(this);
    var more = $currentButton.hasClass('more');
    var $parentArticle = $currentButton.parent('article');
    var $para = $parentArticle.find('p');
    var $ellipsis = $para.find('span.ellipsis');
    var lang = $parentArticle.find('h2').text();
    var textContent = getFullText(lang, programmingLanguages);

    if (more) {
      $para.text(textContent);
      $currentButton.text('Show Less');
    } else {
      $para.text(truncateText(textContent));
      $currentButton.text('Show More');
    }

    $currentButton.toggleClass('more');
  });
});
