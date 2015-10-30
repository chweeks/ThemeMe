themeMe.controller('themeMe', function($http, $sce, $state, $location, $cookies) {
  var self = this;

  self.searchResults = [];

  self.themeSong = '';

  self.comment = '';

  self.username = '';

  self.searchSC = function(searchQuery) {
    SC.initialize({
      client_id: '8e74002fd2542f89231c5133c2a54833'
    });

    SC.get('/tracks', {
      q: searchQuery
    }).then(function successCallback(tracks) {
      self.searchResults = tracks;
    });
  };

  self.setThemeSong = function(songurl) {
    var currentUser = $cookies.get('currentUser');
    var newUrl = { 'url': songurl };
    $http.put('https://agile-waters-4177.herokuapp.com/songs/'+currentUser, newUrl, 'PUT');
  };

  self.userSignUp = function(name, message) {
    var newUser = { 'person': name, 'comment': message };
    $http.post('https://agile-waters-4177.herokuapp.com/songs', newUser, 'POST').then(function successCallback(response){
      var user_id = angular.fromJson(response).data;
      console.log(user_id)
      $cookies.put('currentUser', user_id);
      $state.go('setsong');
   });
  };

  self.mainSong = function() {
    $http({
      method: 'GET',
      url: 'https://agile-waters-4177.herokuapp.com/random'
    }).then(function successCallback(response) {
      var data = angular.fromJson(response.data);
      self.comment = data.comment;
      self.username = data.person;
      self.themeSong = 'https://w.soundcloud.com/player/?url=' + data.url + '&auto_play=true';
    });

    self.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    self.doChange = function() {
      $route.reload();
    };
  };
});
