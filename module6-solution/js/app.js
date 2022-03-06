(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList = "";
  $scope.lunchMsg = "";

  $scope.calcTooMuch = function() {
    var lunchArray = $scope.lunchList.split(",")
    var lunchArrayTrimmed = lunchArray.filter(element => {
      return element.trim() !== '';
    });

    var includesEmpty = lunchArray.length > lunchArrayTrimmed.length;

    console.log(lunchArray);
    console.log(includesEmpty);
    console.log(lunchArrayTrimmed);

    if (!includesEmpty) {
      if (lunchArray.length === 0) {
        $scope.lunchMsg = "Please enter data first";
      } else if (lunchArray.length <= 3){
        $scope.lunchMsg = "Enjoy!";
      } else {
        $scope.lunchMsg = "Too much! man";
      }
    } else {
      if (lunchArrayTrimmed.length === 0) {
        $scope.lunchMsg = "Please enter data first";
      } else if (lunchArrayTrimmed.length <= 3){
        $scope.lunchMsg = "Enjoy!";
      } else {
        $scope.lunchMsg = "Too much!";
      }
    }
  }
}

})();
