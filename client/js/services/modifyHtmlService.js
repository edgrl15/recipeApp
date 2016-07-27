angular.module('myRecetaApp')
  .service('modifyHtmlService', function () {
    this.removeInputRecipe = function (idElementRemove) {
      console.log('removeInputRecipe : ' + idElementRemove);
      var delNewRecipe = document.getElementById(idElementRemove);
      delNewRecipe.parentNode.removeChild(delNewRecipe);
    };
  });