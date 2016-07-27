angular.module('myRecetaApp')
  .controller('loginController', [ '$scope', '$window', 'LoginFactory',
              function ($scope, $window, LoginFactory) {
    $scope.sessNavOn     =  true;
    $scope.newUserOn     =  true;
    $scope.userConnected =  LoginFactory.isUserConnected;
    $scope.disableLogin  =  LoginFactory.diable4Login;
    //$scope.isOnLogin     =! $scope.sessNavOn;
    
    function logUserFunc() {
      $scope.newUserOn = true;
      if ( $scope.sessNavOn == false ) {
        $scope.sessNavOn = true;
      } else {
        $scope.sessNavOn = false;
      }
      $scope.disableLogin       =! $scope.sessNavOn;
      LoginFactory.diable4Login =  $scope.disableLogin;
      $scope.isOnLogin          =! $scope.sessNavOn;
    }
    
    function newUserFunc() {
      $scope.sessNavOn = true;
      if ( $scope.newUserOn == false ) {
        $scope.newUserOn = true;
      } else {
        $scope.newUserOn = false;
      }
      $scope.disableLogin       =! $scope.newUserOn;
      LoginFactory.diable4Login =  $scope.disableLogin;
      $scope.isOnLogin          =! $scope.newUserOn;
    }

    function updUserConnect(userAccount) {
      LoginFactory.chageUserConnected(userAccount);
      $scope.userConnected = LoginFactory.isUserConnected;
      $scope.loginUser     = LoginFactory.userLog;
      console.log('isUserConnected : ' + isUserConnected);
    }
    
    $scope.iniSessNav = logUserFunc;
    
    $scope.newUserApp = newUserFunc;
    
    $scope.submitOwner = function(user) {
      console.log('we are in submitOwner!!!');
      LoginFactory.saveOwner(user)
        .then(function(response) {
          updUserConnect(response.data.userOwner);
          $scope.login        = {};
          $scope.disableLogin = false;
        }), function(err) {
          console.log('saveOwner error : ' + err.message);
      };
    };
    
    $scope.logoutUser = function(account) {
      console.log('we are in logoutUser!!!');
      updUserConnect("");
    }

    $scope.userLogin = function (user) {
      LoginFactory.userLogin(user)
        .then(function(response) { 
          if (response.data.cod_salida == 0 ) {
            $scope.login = "";
            logUserFunc();
            $scope.loginUser     = user.userOwner;
            LoginFactory.userLog = user.userOwner;
            LoginFactory.chageUserConnected(true);
            $scope.userConnected = LoginFactory.isUserConnected;
          } else if (response.data.cod_salida == 1) {
            $scope.sowMessUserLogin = false;
            $scope.messUserLogin    = response.data.messa;
          }
        });
    };
  }]);