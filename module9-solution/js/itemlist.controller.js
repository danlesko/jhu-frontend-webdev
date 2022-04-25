(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemListController', ItemListController);


  ItemListController.$inject = ['items'];

  function ItemListController(items) {
    var itemList = this;
    itemList.items = items;
  }

})();
