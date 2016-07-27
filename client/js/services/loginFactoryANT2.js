angular.module('myRecetaApp')
  .factory('LoginFactory', [ '$http', 
           function($http, $resource) {
      var loginFactory = {};
      
      loginFactory.userLogin  = function(userOwner) {
        return $http.post('/login', userOwner);
      };
      
      loginFactory.saveOwner  = function(userOwner) {
        return $http.post('/login/signup/', userOwner);
      };
      
      return loginFactory;
      
  }]);