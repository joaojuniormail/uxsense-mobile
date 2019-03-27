UXSense.controller('TeamsController', function($scope, $state, $stateParams, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory) {
  console.log("TeamsController");
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();
  $scope.teams = [];
  $rootScope.newTeam = function() {
    $state.go('teams.newTeam');
  };
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    if (toState.name == "teams" && fromState.name == "teams.newTeam") {
      $scope.getTeamList(true);
    }
  });
  $scope.getTeamList = function(loading) {
    var params = {
      idClient: $rootScope.authData.client.id
    };
    requestService.getTeamByClient(params, {
      success: function(data) {
        $scope.teams = data.teams;
      }
    }, loading);
  };
  $scope.getTeamList(true);
  $scope.delete = function(team) {
    $ionicPopup.show({
      title: $translate.instant('popupWarning'),
      template: $translate.instant('msgTeamDeleteConfirm'),
      buttons: [{
        text: $translate.instant('labelCancel')
      }, {
        text: '<b>' + $translate.instant('labelDelete') + '</b>',
        type: 'button-assertive',
        onTap: function(e) {
          var params = {
            client: $rootScope.authData.client.id,
            team: team.id
          };
          requestService.deleteTeamForClient(params, {
            success: function() {
              $scope.getTeamList(true);
            }
          });
        }
      }]
    });
  };
});
