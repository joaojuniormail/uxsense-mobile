UXSense.controller('AppController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory, $ionicTabsDelegate) {
  console.log("AppController");
  $scope.onTabSelected = function (el) {
    switch (el.navViewName) {}
  };
  $scope.onTabDeselected = function (el) {
    switch (el.navViewName) {
      case "teams":
        $rootScope.isTeams = false;
        break;
    }
  };
  $scope.goForward = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if ($state.current.name == "answer.send") {
      return;
    }
    if (selected !== -1) {
      $ionicTabsDelegate.select(selected + 1);
    }
  };
  $scope.goBack = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if ($state.current.name == "answer.send") {
      return;
    }
    if (selected !== -1 && selected !== 0) {
      $ionicTabsDelegate.select(selected - 1);
    }
  };
});
