// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('thememe', ['ionic', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'index.html',
    controller: 'themeMe'
  });

  $stateProvider.state('setsong', {
    url: 'setsong',
    templateUrl: 'setsong.html',
    controller: 'themeMe'
  });

})

.controller('themeMe', function($http, $sce, $state, $location) {
  var self = this;

  self.searchResults = [];

  self.themeSong = '';

  self.getUser = function(email, password, passwordconf) {
    self.userHash = {'email': email, 'password': password, 'passwordConf': passwordconf};
  };

  self.makePost = function(url) {
    var newUrl = { 'url': url };
    $http.post('http://agile-waters-4177.herokuapp.com/sounds', newUrl, 'POST').then(console.log("Post worked"), console.log("You're a scumbag"));
  };

  self.makeGet = function(id) {

    $http({
      method: 'GET',
      url: 'http://agile-waters-4177.herokuapp.com/sounds/'+id
    }).then(function successCallback(response) {
      var data = angular.fromJson(response);
        console.log(response.data.url);
    });
  };



  self.searchSC = function(searchQuery) {
    SC.initialize({
      client_id: '8e74002fd2542f89231c5133c2a54833'
    });

    SC.get('/tracks', {
      q: searchQuery
    }).then(function(tracks) {
      self.searchResults = tracks;
    });
  };

  self.setThemeSong = function(songurl) {
    var newUrl = { 'url': songurl };
    $http.post('http://agile-waters-4177.herokuapp.com/sounds', newUrl, 'POST').then("Post worked", "You're a scumbag");
  };

  self.userSignUp = function(email, password, passwordconf) {
    var postData = { 'email':email, 'password': password, 'password_confirmation': passwordconf};
    $http.post('http://agile-waters-4177.herokuapp.com/users', postData, 'POST').then(function() {
    $state.go('setsong');
    });
  };

  self.mainSong = function(id) {
    $http({
      method: 'GET',
      url: 'http://agile-waters-4177.herokuapp.com/sounds/'+id
    }).then(function successCallback(response) {
      var data = angular.fromJson(response);
      self.themeSong = 'https://w.soundcloud.com/player/?url=' + response.data.url + '&auto_play=true';
    });

    self.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
  };
});
