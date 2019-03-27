UXSense.controller('MyAccountController', function ($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout) {
  console.log("MyAccountController");
  $scope.form = {};
  $scope.validate = {};
  var updateFormData = function () {
    var today = new Date();
    if ($rootScope.authData.client.datebirth) {
      var splitDate = $rootScope.authData.client.datebirth.split('-');
      $scope.form.datebirth = new Date();
      $scope.form.datebirth.setDate(splitDate[2]);
      $scope.form.datebirth.setMonth(parseInt(splitDate[1]) - 1);
      $scope.form.datebirth.setFullYear(parseInt(splitDate[0]));
    } else {
      $scope.form.datebirth = null;
    }
    $scope.form.name = $rootScope.authData.client.name;
    $scope.form.email = $rootScope.authData.client.email;
    $scope.form.register = $rootScope.authData.client.register;
    $scope.form.sex = $rootScope.authData.client.sex;
    today.setDate(today.getDate() - 1);
    $scope.validate.datebirth = today.toISOString().substring(0, 10);
  };
  updateFormData();
  $scope.submit = function () {
    if ($scope.formModel.$invalid) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgRequiredFields')
      }).then(function () {});
      return;
    }
    if (!$scope.form.password) {
      if ($scope.form.newpassword || $scope.form.newpassword_) {
        $ionicPopup.alert({
          title: $translate.instant('popupWarning'),
          template: $translate.instant('msgCurrentPasswordRequired')
        }).then(function () {
          $scope.form.newpassword = "";
          $scope.form.newpassword_ = "";
        });
        return;
      }
    } else {
      if ($scope.form.newpassword !== $scope.form.newpassword_) {
        $ionicPopup.alert({
          title: $translate.instant('popupWarning'),
          template: $translate.instant('msgPasswordNotEquals')
        }).then(function () {});
        return;
      }
    }
    var params = JSON.clone($scope.form);
    if (!$scope.form.datebirth) {
      delete params.datebirth;
    } else {
      params.datebirth = params.datebirth.substring(0, 10);
    }
    requestService.change(params, {
      success: function (data) {
        $rootScope.authData.client = data;
        $rootScope.updateDataStorage();
        $ionicPopup.alert({
          title: $translate.instant('popupSuccess'),
          template: $translate.instant('msgChangeSuccess')
        }).then(function (resp) {
          if (resp) {
            updateFormData();
          }
        });
      }
    });
  };
});
