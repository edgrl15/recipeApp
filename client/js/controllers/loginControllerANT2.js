angular.module('myRecetaApp')
  .controller('loginController', [ '$scope', '$window', 'LoginFactory',
              function ($scope, $window, LoginFactory) {
    $scope.userConnected =  false;
    $scope.sessNavOn     =  true;
    $scope.newUserOn     =  true;
    $scope.disableLogin  =  false;
    $scope.isOnLogin     =! $scope.sessNavOn;
    
    function logUserFunc() {
      $scope.newUserOn = true;
      if ( $scope.sessNavOn == false ) {
        $scope.sessNavOn = true;
      } else {
        $scope.sessNavOn = false;
      }
      $scope.disableLogin =! $scope.sessNavOn;
      $scope.isOnLogin    =! $scope.sessNavOn;
    }
    
    function newUserFunc() {
      $scope.sessNavOn = true;
      if ( $scope.newUserOn == false ) {
        $scope.newUserOn = true;
      } else {
        $scope.newUserOn = false;
      }
      $scope.disableLogin =! $scope.newUserOn;
      $scope.isOnLogin    =! $scope.newUserOn;
    }
    
    $scope.iniSessNav = logUserFunc;
    
    $scope.newUserApp = newUserFunc;
    
    $scope.redirect = function (routeTemplate) {
      if($scope.disableLogin == false) { 
        $window.location.href = routeTemplate;
      }
    };
    
    $scope.submitOwner = function (user) {
      console.log('user : ' + JSON.stringify(user));
      LoginFactory.saveOwner(user)
        .then(function (response) {
          $scope.login = "";
          newUserFunc();
          console.log('response submitOwner : ' + JSON.stringify(response.data));
        });
    };
    
    $scope.userLogin = function (user) {
      LoginFactory.userLogin(user)
        .then(function (response) { 
          if (response.data.cod_salida == 0 ) {
            $scope.login = "";
            logUserFunc();
            $scope.userConnected = true;
            $scope.loginUser = user.userOwner;
          } else if (response.data.cod_salida == 1) {
            $scope.sowMessUserLogin = false;
            $scope.messUserLogin    = response.data.messa;
          }
          console.log('response : ' + JSON.stringify(response));
        });
    };
  }]);