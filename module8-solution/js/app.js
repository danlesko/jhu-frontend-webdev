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
  var narrow = this;

  narrow.found = null;
  narrow.searchTerm = "";
  narrow.finding = false;

  narrow.narrowItDown = function (searchTerm) {
    if(searchTerm != null && searchTerm.length > 0) {
      narrow.finding = true;
      MenuSearchService.getMatchedMenuItems(searchTerm)
          .then(function (response) {
            narrow.found = response;
            narrow.finding = false;
          })
          .catch(function (error) {
            console.log('Uh-oh spaghetti-O\'s\n' + error);
            narrow.finding = false;
          });
    }
  }

  narrow.removeItem = function (index) {
    narrow.found.splice(index, 1);
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
        var menuItems = result.data.menu_items;

        // Get menu items if search string is included in description
        for(var i = 0; i < menuItems.length; i++) {
          if(menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundItems.push(menuItems[i]);
          } else if (menuItems[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
            foundItems.push(menuItems[i]);
          }
        }

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
