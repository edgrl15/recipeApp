// Utilizado en el template costIngred.jade
angular.module('myRecetaApp')
  .controller('costIngController', ['$scope', '$http', '$filter', 'RecetaFactory', 
                                    function($scope, $http, $filter, RecetaFactory) {
    $scope.recipe             = {};
    $scope.hideCostIngr       = true;
    
    console.log('recetaData  : ' + JSON.stringify(RecetaFactory.recetaData));
    $scope.recipe.nameRecipe    = $filter('findField')(RecetaFactory.recetaData,'nameRecipe');
    var ingredMatriz            = $filter('findField')(RecetaFactory.recetaData,'ingredients');
    $scope.ingredients          = ingredMatriz;
    
    $scope.updActive = function (dataIngredient) {
      dataIngredient.costUpd = false;
    };
    
    $scope.removeIngr = function (dataIngredient) {
      console.log();
      RecetaFactory.deleteIngr(RecetaFactory.recetaID, dataIngredient)
        .then(function (response) {
          console.log("Return deleteIngr : " + JSON.stringify(response.data));
          RecetaFactory.recetaData = response.data;
          $scope.ingredients       = $filter('findField')(response.data, 'ingredients');
        });
    };
      
    $scope.updateCostIng = function(dataIngredients) {
      console.log('Paso Por Aca  updateCostIng!!! : ' + dataIngredients.costIngr);
      if (dataIngredients.costIngr !== 0 ) {
        RecetaFactory.updaIngredient(RecetaFactory.recetaID, dataIngredients)
          .then(function (response) {
            RecetaFactory.recetaData = response.data;
            console.log('ingredMatriz : ' + JSON.stringify($filter('findField')(response.data, 'ingredients')));
            var ingredMatriz   = $filter('findField')(response.data, 'ingredients');
            $scope.ingredients = ingredMatriz;
            $scope.idVal=dataIngredients._id;
          });
      }
    };
  }]);