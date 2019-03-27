UXSense.controller('AnswersController', function ($scope, $state, $stateParams, $rootScope, requestService, $translate, $ionicModal, $ionicPopup, $timeout, $ionicHistory) {
  console.log("AnswersController");
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();
  $scope.answers = [];
  $scope.getAnswerList = function (loading) {
    requestService.getAnswers({
      success: function (data) {
        $scope.answers = data.answers;
        $rootScope.isSended = false;
        $rootScope.checkNewQuestion();
      }
    }, loading);
  };
  $scope.getAnswerList(true);
});
