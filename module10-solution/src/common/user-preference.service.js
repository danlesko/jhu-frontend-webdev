(function () {
"use strict";

angular.module('common')
.service('UserPreferenceService', UserPreferenceService);

function UserPreferenceService() {
  var service = this;
  service.registered = false;

  service.setUser = function (user) {
    service.user = user;
    service.registered = true;
  }

  service.getUser = function () {
    return service.user;
  }

  service.setFavorite = function(menuItem) {
    service.favorite = menuItem;
  }
}



})();
