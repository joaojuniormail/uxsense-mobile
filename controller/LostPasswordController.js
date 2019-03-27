UXSense.controller('LostPasswordController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout) {
  console.log("LostPasswordController");
  $scope.form = {};
  $scope.validate = {};
  $scope.submit = function () {
    if ($scope.formModel.$invalid) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgRequiredFields')
      }).then(function () {});
      return;
    }
    var params = JSON.clone($scope.form);
    requestService.lostPassword(params, {
      success: function (data) {
        var message = $translate.instant('msgLostPasswordError');
        if (data.sent === true) {
          message = $translate.instant('msgLostPasswordSuccess');
        }
        $ionicPopup.alert({
          title: $translate.instant('popupSuccess'),
          template: message
        }).then(function (resp) {
          if (resp) {
            $rootScope.clearData();
            $state.go('login');
          }
        });
      }
    });
  };
});
