angular.module('myRecetaApp')
  .factory('LoginFactory', [ '$http', 
           function($http) {
      var loginFactory = {};
      
      loginFactory.userLog         = "";
      loginFactory.diable4Login    = false;
      loginFactory.isUserConnected = false;
      
      loginFactory.chageUserConnected = function (userAcco) {
        loginFactory.userLog         = userAcco;
        if( userAcco == "" ) {
          loginFactory.isUserConnected = false;
        } else {
          loginFactory.isUserConnected = true;
        }
      };
      
      loginFactory.userLogin  = function(userOwner) {
        return $http.post('/login', userOwner);
      };
      
      loginFactory.saveOwner  = function(userOwner) {
        return $http.post('/login/signup/', userOwner);
      };
      
      return loginFactory;
      
  }]);