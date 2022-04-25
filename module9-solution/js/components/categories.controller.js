(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryController', CategoryController);


  CategoryController.$inject = ['MenuDataService', 'items'];
function CategoryController(MenuDataService, items) {
  var ctrl = this;
  ctrl.items = items;
}

})();
