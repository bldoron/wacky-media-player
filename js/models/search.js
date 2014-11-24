App.Search = DS.Model.extend({
  q: DS.attr('string'),
  nextPage: DS.attr('string'),
  prevPage: DS.attr('string'),
  totalResults: DS.attr('number')
//  ,
//  isNext: function() {
//      return (typeof nextPage === 'string');
//  }.observes('nextPage').on('init'),
//  isPrev: function() {
//      return (typeof prevPage === 'string');
//  }.observes('prevPage').on('init')
});

