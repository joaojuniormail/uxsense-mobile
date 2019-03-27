UXSense.controller('TermController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory, $window) {
  console.log("TermController");
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();
  $scope.submit = function () {
    $rootScope.notificationConfig();
    $rootScope.terms = $rootScope.terms || {};
    $rootScope.terms[$rootScope.termVersion] = true;
    $rootScope.updateDataStorage();
    $state.go('login');
  };
});
