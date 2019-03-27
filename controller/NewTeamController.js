UXSense.controller('NewTeamController', function($scope, $state, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicNavBarDelegate, $ionicHistory) {
  console.log("NewTeamController");
  $scope.form = {};
  $rootScope.isTeams = false;
  $scope.submit = function() {
    if ($scope.formModel.$invalid) {
      $ionicPopup.alert({
        title: $translate.instant('popupWarning'),
        template: $translate.instant('msgRequiredFields')
      }).then(function() {});
      return;
    }
    var params = {
      client: $rootScope.authData.client.id,
      team: $scope.form.team.id
    };
    requestService.setTeamForClient(params, {
      success: function() {
        $ionicPopup.alert({
          title: $translate.instant('popupSuccess'),
          template: $translate.instant('msgTeamRegisterSuccess')
        }).then(function() {
          $state.go('teams');
          $rootScope.isSended = false;
          $rootScope.checkNewQuestion();
        });
      }
    },true);
  };
  var getGroupList = function() {
    requestService.getGroups({
      success: function(data) {
        $scope.groups = data.groups;
      }
    });
  };
  var getSubgroupList = function(groupId) {
    var params = {
      idGroup: groupId
    };
    requestService.getSubgroupByGroup(params, {
      success: function(data) {
        $scope.subgroups = data.subgroups;
      }
    });
  };
  var getTeamsList = function(subgroupId) {
    var params = {
      idSubgroup: subgroupId
    };
    requestService.getTeamBySubgroup(params, {
      success: function(data) {
        $scope.teams = data.teams;
      }
    });
  };
  $scope.changeGroup = function() {
    $scope.form.subgroup = null;
    $scope.form.team = null;
    $scope.subgroups = [];
    $scope.teams = [];
    if ($scope.form.group) {
      getSubgroupList($scope.form.group.id);
    }
  };
  $scope.changeSubgroup = function() {
    $scope.form.team = null;
    $scope.teams = [];
    if ($scope.form.subgroup) {
      getTeamsList($scope.form.subgroup.id);
    }
  };
  getGroupList();
});
