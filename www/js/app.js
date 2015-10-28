// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('thememe', ['ionic', 'ngCordova', 'ui.router', 'ngCookies'])

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

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      cache: false,
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'themeMe'
    })

    .state('setsong', {
      cache: false,
      url: '/',
      templateUrl: 'templates/setsong.html',
      controller: 'themeMe'
    })

    // .state('userhome', {
    //   cache: false,
    //   url: '/',
    //   templateUrl: 'templates/userhome.html',
    //   controller: 'themeMe'
    // })

    .state('playtheme', {
      cache: false,
      url: '/',
      templateUrl: 'templates/play.html',
      controller: 'themeMe'
    })

})

.controller('themeMe', function($http, $sce, $state, $location, $cookies, $cordovaGeolocation, $interval) {
  var self = this;

  self.searchResults = [];

  self.themeSong = '';

  self.userID;

  self.getUser = function(email, password, passwordconf) {
    self.userHash = {'email': email, 'password': password, 'passwordConf': passwordconf};
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
    var newUrl = { 'sound': songurl };
    var currentUser = $cookies.get('currentUser');
    console.log(self.userID);
    $http.put('http://agile-waters-4177.herokuapp.com/users/'+currentUser, newUrl, 'PUT').then("Post worked", "You're a scumbag");
  };

  self.userSignUp = function(email, password, passwordconf) {
    var newUser = { 'email': email, 'password': password, 'passwordconf': passwordconf };
    $http.post('http://agile-waters-4177.herokuapp.com/users', newUser, 'POST').then(function successCallback(response){
      var user_id = angular.fromJson(response).data.user;
      $cookies.put('currentUser', user_id);
      $state.go('setsong');
   });
  };

  self.mainSong = function() {
    var currentUser = $cookies.get('currentUser');
    $http({
      method: 'GET',
      url: 'http://agile-waters-4177.herokuapp.com/users/'+currentUser
    }).then(function successCallback(response) {
      var data = angular.fromJson(response);
      self.themeSong = 'https://w.soundcloud.com/player/?url=' + response.data.sound + '&auto_play=true';
    });

    self.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
  };

   self.distance = "";
   self.ownLat = "";
   self.ownLong = "";

   var posOptions = {timeout: 5000, enableHighAccuracy: true};

   $interval(function(){
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function(position){
                 var lat  = position.coords.latitude;
                 self.ownLat = lat;
                 var long = position.coords.longitude;
                 self.ownLong = long;
                 // self.coor.push(lat);
                 // self.coor.push(long);
                //  console.log('lat', lat);
                //  console.log('long', long);
                //  console.log('coor', self.coor);
                var coords = { 'lon': long , 'lat': lat}
                var currentUser = $cookies.get('currentUser');
                $http.put('http://agile-waters-4177.herokuapp.com/users/'+currentUser, coords, 'POST').then(function successCallback(response){
                });
             }, function(error){
                 console.log('error:', error);
             });
   }, 10000);


});
