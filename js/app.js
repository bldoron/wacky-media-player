App = Ember.Application.create();

App.Constants = Ember.Object.extend({
  GOOGLE_PUBLIC_API_KEY : 'AIzaSyA0AV2HQO9Lwx1_qp0qbUUAvp3CadA5EtQ',
  MAX_SEARCH_RESULTS : 50,
  BASE_URL : function() {
      return "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=" + this.get('MAX_SEARCH_RESULTS') + '&key=' + this.get('GOOGLE_PUBLIC_API_KEY');
  }.property('MAX_SEARCH_RESULTS', 'GOOGLE_PUBLIC_API_KEY')
});
App.CONS = App.Constants.create();

App.VideosController = Ember.ArrayController.extend({
    needs: ['application'],
    createVideoArray: function(items) {
        var self = this;
        $.each(items, function(index, item){
            var _id = item.id.videoId
            item.id = _id;
            item.title = item.snippet.title;
            item.publishedAt = item.snippet.publishedAt;
            item.channelId = item.snippet.channelId;
            item.channelTitle = item.snippet.channelTitle;
            item.description = item.snippet.description;
            item.thumbnail = item.snippet.thumbnails.default.url;
            self.store.update('video', item);
        });
        return items;
    }
});

App.ApplicationController = Ember.ArrayController.extend({
    needs: ['videos'],
    retrieveData: function(url, q){
        var self = this;
        return Ember.$.getJSON(url).then(function(data) {
            var searchResults = {
                q: q,
                prevPage: data.prevPageToken,
                nextPage: data.nextPageToken,
                totalResults: data.pageInfo.totalResults
            }
            searchResults.id = data.nextPageToken ? q + data.nextPageToken : q + "nonono";
            searchResults.videos = self.get('controllers.videos').createVideoArray(data.items);
            return searchResults;
        });
    }
});

App.VideoController = Ember.ObjectController.extend({
    needs: ['application']
});

//App.SearchController = Ember.ObjectController.extend({
//    isNext: function() {
//          return (typeof nextPage === 'string');
//    }.observes('nextPage').on('init'),
//      isPrev: function() {
//          return (typeof prevPage === 'string');
//    }.observes('prevPage').on('init')
//});

//App.ApplicationAdapter = DS.FixtureAdapter.extend();
