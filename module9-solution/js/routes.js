(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })

      // Set up UI states
      .state('categories', {
        url: '/categories',
        templateUrl: 'templates/categories.html',
        // Use controller name in template itself
        controller: 'CategoryController as category',
        resolve: {
          items: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('menuItems', {
        url: '/menu-items/{shortName}',
        templateUrl: 'templates/items.html',
        // Use controller name in template itself
        controller: 'ItemController as item',
        resolve: {
          items: ['$stateParams', 'MenuDataService',
            function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
            }
          ]
        }
      });
  }


})();
