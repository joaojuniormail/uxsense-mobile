UXSense.controller('HomeController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory, $window) {
  console.log("HomeController");
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();
  $rootScope.checkNewQuestion();
});
