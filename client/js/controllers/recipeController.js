// Utilizado en la Vista "addReceta"
angular.module('myRecetaApp')
  .controller('recetaController', [ '$scope', '$http','$filter', 'LoginFactory','RecetaFactory', 
               function ($scope, $http, $filter, LoginFactory, RecetaFactory) {
    var recipeID         = $filter('findField')(RecetaFactory.recetaData,'_id');
    $scope.userLogin     = LoginFactory.userLog;
    $scope.nameRecipe    = $filter('findField')(RecetaFactory.recetaData,'nameRecipe');
    
    $scope.$watch(function() {
      return RecetaFactory.recetaData;
    }, function(NewValue, OldValue) {
      console.log('RecetaFactory.recetaData watch : ' + JSON.stringify(RecetaFactory.recetaData));
      recipeID             = $filter('findField')(RecetaFactory.recetaData,'_id');
      $scope.nameRecipe    = $filter('findField')(RecetaFactory.recetaData,'nameRecipe');
      $scope.ingredientsDB = $filter('findField')(RecetaFactory.recetaData,'ingredients');
      $scope.nvaRecipe     = $scope.nameRecipe;
      console.log('recipeID                       : ' + recipeID);
      if (RecetaFactory.recetaData == "") {
        console.log('Paso por el watch!!!');
        $scope.isNewRecipe   = true;
      } else {
        console.log('Paso por el watch2!!!');
        //console.log('RecetaFactory.recetaData : ' + JSON.stringify(RecetaFactory.recetaData[0]));
        $scope.isNewRecipe   = false;
      }
      console.log('Salio Watch RecetaFactory.recetaData!!!' + $scope.nameRecipe);
    });
    
    $scope.$watch(function() {
      return LoginFactory.userLog;
    }, function(NewValue, OldValus) {
      $scope.userLogin = LoginFactory.userLog;
    });
    
    if (RecetaFactory.recetaData == "") {
      $scope.isNullRecipe = true;
    }
    
    function listTypMeas() {
      console.log('Dentro listTypMeas');
      RecetaFactory.listMeasure()
        .then(function (response) {
          console.log('listTypMeas response : ' + response.data);
          $scope.typesMeasure = response.data;
        }), function(err) {
          console.log('Error listTypesMeasure : ' + err.message);
      };
    }
    
    listTypMeas();
    
    if ( recipeID !== "" ) {
      
      console.log('ingredients  : ' + JSON.stringify(RecetaFactory.recetaData));
      $scope.nameRecipe    = $filter('findField')(RecetaFactory.recetaData,'nameRecipe');
      $scope.ingredientsDB = $filter('findField')(RecetaFactory.recetaData,'ingredients');
      $scope.isNewRecipe   = false;
      
    }
    
    console.log('nvaRecipe  : ' + $scope.nvaRecipe);
    console.log('nameRecipe : ' + $scope.nameRecipe);
    if ( $scope.nvaRecipe === ""  &&  $scope.nameRecipe == undefined ) {
     $scope.isNullRecipe = true; 
    }
    
    $scope.removeIngred = function(dataIngredient) {
      console.log('Data Ingredient : ' + JSON.stringify(dataIngredient));
      RecetaFactory.deleteIngr(RecetaFactory.recetaID, dataIngredient)
        .then(function (response) {
          console.log("Return deleteIngr : " + JSON.stringify(response.data));
          RecetaFactory.recetaData = response.data;
          $scope.ingredients       = $filter('findField')(response.data, 'ingredients');
        });
    };
    
    $scope.saveReceta = function() {
      if ($scope.nvaRecipe === '') {
        $scope.isNullRecipeSave = true;
      } else {
        $scope.isNewRecipe       = false;
        RecetaFactory.recetaData = { "nameRecipe" : $scope.nvaRecipe }
        //RecetaFactory.nameRecipe = $scope.nameRecipe;
        $scope.isNullRecipeSave  = false;
        $scope.isNullRecipe      = false;
      }
    };
    
    $scope.saveDB = function(nameRecipe, dataIngredients) {
      var recipeData = {};
      console.log('\n Entro a save!!!');
      console.log('recipeID : ' + recipeID);
      
      if (  recipeID === "" || recipeID == undefined ) {
        console.log('New Recipe');
        console.log('nameRecipe      : ' + JSON.stringify(nameRecipe));
        console.log('dataIngredients : ' + JSON.stringify(dataIngredients));
        
        recipeData = { "nameRecipe" : nameRecipe, "ingredients" : dataIngredients, "ownerRecipe" : LoginFactory.userLog};
        console.log('recipeData : ' + JSON.stringify(recipeData));
        RecetaFactory.saveRecipe(recipeData)
          .then(function (response) {
            /* Al momento de actualizar el valor de RecetaFactory.recetaData
             * se llama el watch y carga las variables 
             * $scope.nameRecipe,  $scope.ingredientsDB y$scope.nvaRecipe   */
            RecetaFactory.recetaData = response.data;
            $scope.ingredientsNew={};
        }), function(err) {
                console.log(err.message);
        };
          
          } else {
            console.log('New Ingredient \n \n');
            RecetaFactory.saveIngredient(recipeID, dataIngredients)
              .then(function (response) {
                /* Al momento de actualizar el valor de RecetaFactory.recetaData
                 * se llama el watch y carga las variables 
                 * $scope.nameRecipe,  $scope.ingredientsDB y$scope.nvaRecipe   */
                RecetaFactory.recetaData  = response.data;
                $scope.ingredientsNew={};
              }), function (err) {
                console.log('Error : ' + err.message);
              };
          }
      };
  }]);