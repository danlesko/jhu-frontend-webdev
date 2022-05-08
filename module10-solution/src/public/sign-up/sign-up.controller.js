(function () {

angular.module('public')
.controller('SignUpController', SignUpController);


SignUpController.$inject =['UserPreferenceService', 'MenuService']
function SignUpController(UserPreferenceService, MenuService) {
  var signUpCtrl = this;
  signUpCtrl.registered = UserPreferenceService.registered;
  signUpCtrl.error = false;

  signUpCtrl.checkForItem = function () {
    MenuService.getMenuItem(signUpCtrl.user.favorite).then(function(response) {
      UserPreferenceService.setFavorite(response);
      signUpCtrl.error = false;
    }).catch(function() {
      signUpCtrl.error = true;
    });
  }

  signUpCtrl.submit = function () {
    signUpCtrl.registered = true;
    UserPreferenceService.setUser(signUpCtrl.user);
  };
}

})();
