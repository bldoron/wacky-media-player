App.Router.map(function() {
  this.resource('videos', function() {
    this.resource('video', { path: ':id' });
//    this.resource('search', { path: '/search/:q' });
  });
});

App.ApplicationRoute = Ember.Route.extend({
    model: function () {
        return this.store.createRecord('search', {id: -1, q:"", totalResults: 0});
    },
    setupController: function (controller, model) {
        controller.set('search', model);
    },
    actions: {
        search: function (q) {
            var url = App.CONS.get('BASE_URL') + '&q=' + q;
            var self = this;
            this.set('isSearching', true);
            this.controller.retrieveData(url, q).then(function(searchInfo){
                self.controllerFor("videos").set('videos', searchInfo.videos);
                self.controller.set('isSearching', false);
                delete searchInfo.videos;
                self.store.update('search', searchInfo);
                self.set('search', searchInfo);
//                self.controllerFor("search").set('search', searchInfo);
//                self.get('controllers.search').set('search', searchInfo);
            });
        },
        prev: function () {
            var q = model.get('q');
            var url = App.CONS.get('BASE_URL') + '&q=' + q + '&pageToken=' + model.get('prevPage');
            return App.retrieveData(url, q);
        },
        next: function () {
            var q = model.get('q');
            var url = App.CONS.get('BASE_URL') + '&q=' + q + '&pageToken=' + model.get('nextPage');
            return App.retrieveData(url, q);
        }
    }
});

//App.SearchRoute = Ember.Route.extend({
//  model: function() {
//    var artistObjects = [];
//    Ember.$.getJSON('&q=u2', function(artists) {
//      artists.forEach(function(data) {
//        artistObjects.pushObject(App.Video.createRecord(data));
//      });
//    });
//    return artistObjects;
//  }
//});

App.VideosRoute = Ember.Route.extend({
    model: function () {
//        return this.store.find('video');
	},
	setupController: function (controller, model) {
//		controller.set('videos', model);
	}
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function () {
        this.transitionTo('videos');
	}
});

App.VideoRoute = Ember.Route.extend({
	model: function(video) {
        return this.store.find('video', video.id);
  	}
});
