(function () {
'use strict';

angular.module('ShoppingListCheckoff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckoffService', ShoppingListCheckOffService)
.filter('DollaDolla', DollaDollaFilter);

ToBuyController.$inject = ['ShoppingListCheckoffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyer = this;
  buyer.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  buyer.buyItem = function(itemName, quantity){
    ShoppingListCheckOffService.buyItem(itemName, quantity)
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

  bought.runningTotal = function(){
    return ShoppingListCheckOffService.getRunningTotal();
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    {
      "item" : "cookies",
      "quantity" : 10,
      "price" : 2
    },
    {
      "item" : "fruit",
      "quantity" : 2,
      "price" : 5
    },
    {
      "item" : "soda",
      "quantity" : 3,
      "price" : 1
    },
    {
      "item" : "crackers",
      "quantity" : 12,
      "price" : 6
    },
    {
      "item" : "medicine",
      "quantity" : 3,
      "price" : 11
    }
  ];
  var alreadyBoughtItems = [];
  var runningTotal = 0;

  service.buyItem = function (itemName, quantity) {
      var boughtItem = toBuyItems.filter(obj => {return obj.item === itemName});
      boughtItem = boughtItem[0];

      // remove item from toBuyItems
      var removeIndex = toBuyItems.map(item => item.item).indexOf(boughtItem.item);
      ~removeIndex && toBuyItems.splice(removeIndex, 1);

      // add item to the alreadyBoughtItems list
      boughtItem.quantity = quantity;
      alreadyBoughtItems.push(boughtItem);

      runningTotal = runningTotal + boughtItem.quantity * boughtItem.price;
      console.log(runningTotal);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.getRunningTotal = function() {
    return runningTotal;
  }
}

function DollaDollaFilter() {
  return function (input) {
    input = "$$" + input;
    return input;
  };
}

})();
