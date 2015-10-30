
var themeMe = angular.module('thememe', ['ionic', 'ui.router', 'ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

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
      url: '/setsong',
      templateUrl: 'templates/setsong.html',
      controller: 'themeMe'
    })

    .state('playtheme', {
      cache: false,
      url: '/playtheme',
      templateUrl: 'templates/play.html',
      controller: 'themeMe'
    })

})
