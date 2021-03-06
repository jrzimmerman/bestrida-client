angular.module('activechallengesctrl', [])

.controller('ActiveChallengesCtrl',['$scope', 'ActiveChallengesFct', 'localStorageService', function($scope, ActiveChallengesFct, localStorageService) {

  $scope.userId = localStorageService.get('userId');
  $scope.photo = {};

  $scope.doRefresh = function() {

    ActiveChallengesFct.getActiveChallenges($scope.userId)
    .success(function(data) {
      $scope.activeChallenges = data;
      $scope.activeChallenges.forEach(function(challenge) {
       if($scope.userId != challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.userId != challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
      });
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  ActiveChallengesFct.getActiveChallenges($scope.userId)
    .success(function(data) {
      $scope.activeChallenges = data;
      $scope.activeChallenges.forEach(function(challenge) {
        if($scope.userId != challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.userId != challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
      });
    });

  ActiveChallengesFct.getFriends($scope.userId)
    .success(function(data) {
      data.forEach(function(friend) {
        $scope.photo[friend.id] = friend.photo;
      });
    });

  var userId = $scope.userId;
  $scope.removeActiveChallenge = function(activeChallenge, userId) {
    ActiveChallengesFct.removeActiveChallenge(activeChallenge, userId);
  };

}]);