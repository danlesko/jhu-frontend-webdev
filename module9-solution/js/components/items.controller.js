(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemController', ItemController);


  ItemController.$inject = ['items'];

  function ItemController(items) {
    var ctrl = this;
    ctrl.items = items;
  }

})();
