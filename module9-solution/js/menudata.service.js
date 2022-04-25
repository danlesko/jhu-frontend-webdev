(function() {
  'use strict';
  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('BaseUrl', 'https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['BaseUrl', '$http']

  function MenuDataService(BaseUrl, $http) {
    var service = this;

    service.getAllCategories = function() {
      return $http({
        method: "GET",
        url: (BaseUrl + "/categories.json")
      }).then(function(result) {
        var categories = [];
        for (var item of result.data) {
          categories.push(item);
        }
        return categories;
      });
    };

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (BaseUrl + "/menu_items.json?category=" + categoryShortName)
      }).then(function(result) {
        var menuItems = [];
        for (var item of result.data.menu_items) {
          menuItems.push(item);
        }
        return menuItems;
      });
    };

  }

})();
