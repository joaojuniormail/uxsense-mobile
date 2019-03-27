UXSense.controller('SignupController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout) {
  console.log("SignupController");
  $scope.form = {
    sex: 'NIL'
  };
  $scope.validate = {};
  $scope.form.datebirth = null;
  var today = new Date();
  today.setDate(today.getDate() - 1);
  $scope.validate.datebirth = today.toISOString().substring(0, 10);
  $scope.submit = function () {
    if ($scope.formModel.$invalid) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgRequiredFields')
      }).then(function () {});
      return;
    }
    if (!$scope.form.password.test(".{6,16}") || !$scope.form.password_.test(".{6,16}")) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgPasswordNotValidation')
      }).then(function () {});
      return;
    }
    if ($scope.form.password !== $scope.form.password_) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgPasswordNotEquals')
      }).then(function () {});
      return;
    }
    var params = JSON.clone($scope.form);
    if (!$scope.form.datebirth) {
      delete params.datebirth;
    } else {
      params.datebirth = params.datebirth.substring(0, 10);
    }
    requestService.signup(params, {
      success: function (data) {
        $rootScope.authData.client = data;
        $ionicPopup.alert({
          title: $translate.instant('popupSuccess'),
          template: $translate.instant('msgSignupSuccess')
        }).then(function (resp) {
          if (resp) {
            $rootScope.updateDataStorage();
            $state.go('login');
          }
        });
      }
    });
  };
});
