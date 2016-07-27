angular.module('myRecetaApp')
  .factory('RecetaFactory', [ '$http', function($http) {
      var recetaFactory = {};
      
      recetaFactory.recetaID   = "";
      recetaFactory.nameRecipe = "";
      recetaFactory.recetaData = "";
      
      recetaFactory.findRecipeOwner = function(userLogin) {
        return $http.get('/receta/owner/' + userLogin);
      };
      
      recetaFactory.findOneRecipe  = function(idRecipe) {
        return $http.get('/receta/' + idRecipe);
      };
      
      recetaFactory.saveRecipe     = function(recipe) {
        return $http.post('/receta/creaReceta', recipe);
      };
      
      recetaFactory.saveIngredient = function(idRecipe, ingredient) {
        return $http.post('/receta/creaIngre/' + idRecipe, ingredient);
      };
      
      recetaFactory.updaIngredient = function(idRecipe, ingredient) {
        return $http.post('/receta/updatIngre/' + idRecipe + '/' + ingredient._id, ingredient);
      };
      
      recetaFactory.listMeasure    = function() {
        return $http.get('/allMeasure');
      };
      
      recetaFactory.updaCostRecipe = function(idRecipe) {
        return $http.post('/receta/updatCostRecipe/' + idRecipe);
      };
      
      recetaFactory.deleteRecipe   = function(idRecipe) {
        return $http.post('/receta/destroy/' + idRecipe);
      };
      
      recetaFactory.deleteIngr     = function(idRecipe, ingredient) {
        return $http.post('/receta/destroy/' + idRecipe + '/' + ingredient._id);
      };
      
      recetaFactory.cleanRecipe    = function() {
        console.log('Limpia Informacion Recetas Creada');
        recetaFactory.recetaID   = "";
        recetaFactory.nameRecipe = "";
        recetaFactory.recetaData = "";
      };
      
      return recetaFactory;
      
  }]);