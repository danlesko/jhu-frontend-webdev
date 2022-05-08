(function() {

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserPreferenceService','ApiPath']

  function MyInfoController(UserPreferenceService, ApiPath) {
    var myInfoCtrl = this;

    myInfoCtrl.basePath = ApiPath;
    myInfoCtrl.registered = UserPreferenceService.registered;

    if (myInfoCtrl.registered) {
      myInfoCtrl.user = UserPreferenceService.getUser();
      myInfoCtrl.favorite = UserPreferenceService.favorite;
    }
  }

})();
