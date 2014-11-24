App.Video = DS.Model.extend({
  title: DS.attr('string'),
  channelId: DS.attr('string'),
  channelTitle: DS.attr('string'),
  description: DS.attr('string'),
  publishedAt: DS.attr('date'),
  thumbnail: DS.attr('string'),
  videoUrl: function() {
      return "http://www.youtube.com/embed/" + this.get('id');
  }.property('id')
});
