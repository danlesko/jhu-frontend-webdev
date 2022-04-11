(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems);

// Inject Service into controller, helps for minification
NarrowItDownController.$inject = ['MenuSearchService'];
// Inject $http into service
MenuSearchService.$inject = ['$http'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.found = null;
  controller.searchTerm = "";
  controller.finding = false;

  controller.narrowItDown = function (searchTerm) {
    if(searchTerm != null && searchTerm.length > 0) {
      controller.finding = true;
      MenuSearchService.getMatchedMenuItems(searchTerm)
          .then(function (response) {
            controller.found = response;
            controller.finding = false;
          })
          .catch(function (error) {
            console.log('Something went terribly wrong!\n' + error);
            controller.finding = false;
          });
    }
    else
      controller.found = [];
  }

  controller.removeItem = function (index) {
    controller.found.splice(index, 1);
  }

}

// Be sure to include $http as a param passed to this function in order to allow for $http service to function
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
    return $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    })
      .then(function (result) {
        var foundItems = [];
        // Process result and only keep items that match
        var menuItems = result.data.menu_items;

        for(var i = 0; i < menuItems.length; i++) {
          if(menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(menuItems[i]);
          }
        }

        // Return processed items
        return foundItems;
      });
  }
}

function foundItems() {
  var ddo;
  ddo = {
    restrict: 'E',
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      found: '<',
      onRemove: '&',
      finding: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowItDownCtrl',
    bindToController: true
  };

  return ddo;
}

})();
