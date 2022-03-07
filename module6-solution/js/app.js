(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList = "";
  $scope.lunchMsg = "";
  $scope.formValid = "";
  $scope.textColor = "";

  $scope.calcTooMuch = function() {
    var lunchArray = $scope.lunchList.split(",")
    var lunchArrayTrimmed = lunchArray.filter(element => {
      return element.trim() !== '';
    });

    if (lunchArrayTrimmed.length === 0) {
      $scope.lunchMsg = "Please enter data first!";
      $scope.formValid = "has-error";
      $scope.textColor = "text-danger";
    } else if (lunchArrayTrimmed.length <= 3){
      $scope.lunchMsg = "Enjoy!";
      $scope.formValid = "has-success";
      $scope.textColor = "text-success";
    } else {
      $scope.lunchMsg = "Too much!";
      $scope.formValid = "has-success";
      $scope.textColor = "text-success";
    }

  }
}

})();
