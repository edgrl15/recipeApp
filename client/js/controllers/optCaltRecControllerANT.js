angular.module('myRecetaApp')
  .controller('optCaltRecController', [ '$scope', 'LoginFactory', 'RecetaFactory', 
              function ($scope, LoginFactory, RecetaFactory) {
      
      $scope.$watch(function() {
        return LoginFactory.userLog;
      }, function(NewValue, OldValue){
        if ( LoginFactory.userLog == "" ) {
          $scope.isUserConnected = false;
        } else {
          $scope.isUserConnected = true;
          $scope.Recipes = RecetaFactory.findRecipeOwner(LoginFactory.userLog)
            .then(function(response){
              console.log('Owner Recipe : ' + JSON.stringify(response));
              return response.data;
            }),function(err) {
              console.log('Error findRecipeOwner : ' + err);
            };
        }
      });
      
  }]);