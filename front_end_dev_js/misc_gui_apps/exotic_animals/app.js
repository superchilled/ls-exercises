$(function() {
  var animalData = [
    {
      image: 'tiger.jpg',
      alttext: "Photo of a tiger, stretching, on a tree-trunk.",
      description: "The tiger (Panthera tigris) is the largest cat species, most recognizable for its pattern of dark vertical stripes on reddish-orange fur with a lighter underside. The species is classified in the genus Panthera with the lion, jaguar, leopard, and snow leopard. It is an apex predator, primarily preying on ungulates such as deer and bovids. It is territorial and generally a solitary but social predator, often requiring large contiguous areas of habitat that support its prey requirements. This, coupled with the fact that it is indigenous to some of the more densely populated places on Earth, has caused significant conflicts with humans."
    },
    {
      image: 'lion.jpg',
      alttext: 'Photo of a male lion sat in the savannah.',
      description: 'The lion (Panthera leo) is a species in the family Felidae; it is a muscular, deep-chested cat with a short, rounded head, a reduced neck and round ears, and a hairy tuft at the end of its tail. The lion is sexually dimorphic; males are larger than females with a typical weight range of 150 to 250 kg (330 to 550 lb) for males and 120 to 182 kg (265 to 400 lb) for females. Male lions have a prominent mane, which is the most recognisable feature of the species. A lion pride consists of a few adult males, related females and cubs. Groups of female lions typically hunt together, preying mostly on large ungulates. The species is an apex and keystone predator, although they scavenge when opportunities occur. Some lions have been known to hunt humans, although the species typically does not.'
    },
    {
      image: 'panther.jpg',
      alttext: 'Photo of a panther prowling in front of some long grass.',
      description: 'The jaguar (Panthera onca) is a wild cat species and the only extant member of the genus Panthera native to the Americas. The jaguar\'s present range extends from Southwestern United States and Mexico in North America, across much of Central America, and south to Paraguay and northern Argentina in South America. Though there are single cats now living within the western United States, the species has largely been extirpated from the United States since the early 20th century. It is listed as Near Threatened on the IUCN Red List; and its numbers are declining. Threats include loss and fragmentation of habitat.'
    },
    {
      image: 'snow-leopard.jpg',
      alttext: 'Photo of a snow leopard, head on, walking in the snow towards camera.',
      description: "The snow leopard is solitary, except for females with cubs. They rear them in dens in the mountains for extended periods. An individual snow leopard lives within a well-defined home range, but does not defend its territory aggressively when encroached upon by other snow leopards. Home ranges vary greatly in size. In Nepal, where prey is abundant, a home range may be as small as 12 km2 (5 sq mi) to 40 km2 (15 sq mi) and up to five to 10 animals are found here per 100 km2 (39 sq mi); in habitats with sparse prey, though, an area of 1,000 km2 (386 sq mi) supports only five of these cats."
    },
  ];

  var $captions = $('#exotic-animals figcaption');

  var $figureTemplate = $('#figure-template').remove();
  var $animalsTemplate = $('#animals-template').remove();
  var figureTemplateFunc = Handlebars.compile($figureTemplate.html());
  var animalsTemplateFunc = Handlebars.compile($animalsTemplate.html());
  Handlebars.registerPartial('animal', figureTemplateFunc);

  $('#exotic-animals').append(animalsTemplateFunc({ animals: animalData }));

  var $captions = $('#exotic-animals figcaption');
  var $figures = $('#exotic-animals figure');
  $captions.hide();

  $figures.on('mouseover', function(event) {
    var $currentCaption = $(this).find('figcaption');
    $currentCaption.delay(2000).fadeIn();
  });

  $figures.on('mouseout', function(event) {
    var $currentCaption = $(this).find('figcaption');
    $currentCaption.stop(true).fadeOut('fast');
  });
});
