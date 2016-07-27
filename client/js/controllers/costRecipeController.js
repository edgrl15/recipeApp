angular.module('myRecetaApp')
  .controller('costRecController', [ '$scope', '$filter', 'RecetaFactory', function ($scope, $filter, RecetaFactory) {
    $scope.recipe = {};

    console.log('costRecController : ' + JSON.stringify(RecetaFactory.recetaData));
    $scope.ingredients       = $filter('converMatriz')(RecetaFactory.recetaData);
    RecetaFactory.updaCostRecipe(RecetaFactory.recetaID)
      .then( response => {
        RecetaFactory.recetaData = response.data;
        $scope.recipe.nameRecipe = RecetaFactory.recetaData.nameRecipe;
        console.log('nameRecipe : ' + RecetaFactory.recetaData.nameRecipe);
        console.log('nameRecipe : ' + RecetaFactory.recetaData.cost);
        $scope.recipe.costRecipe = RecetaFactory.recetaData.cost;
      });
  }]);