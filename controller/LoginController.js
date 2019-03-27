UXSense.controller('LoginController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory, $window) {
  console.log("LoginController");
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();
  $scope.form = {};
  $scope.goToSignUp = function () {
    $state.go('signup');
  };
  $scope.goToLostPassword = function () {
    $state.go('lostPassword');
  };
  $scope.submit = function () {
    if ($scope.formModel.$invalid) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgRequiredFields')
      }).then(function () {});
      return;
    }
    if (!$scope.form.password.test(".{6,16}")) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgPasswordNotValidation')
      }).then(function () {});
      return;
    }
    var params = JSON.clone($scope.form);
    var device = ionic.Platform.device();
    $rootScope.isSended = false;
    $rootScope.generateTokenFCM(function (token) {
      device.registrator_id = token;
      angular.extend(params, device);
      requestService.login(params, {
        success: function (data) {
          $scope.form = {};
          $rootScope.authData = data || {};
          $rootScope.authData.authenticated = true;
          $rootScope.authHeader['GSX-DEVICE'] = data.device.id;
          $rootScope.authHeader['GSX-TOKEN'] = data.device.token;
          $rootScope.updateDataStorage();
          $state.go('home');
        }
      });
    });
  };
});
