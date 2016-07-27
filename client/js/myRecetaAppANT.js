angular.module('myRecetaApp',['ngAnimate'])
  .filter('documentMatiz', function() {
    return function ( matriz, fieldName) {
      var vPunt;
      if ( matriz.length == undefined ) {
        console.log('matriz :  ' + JSON.stringify(matriz));
        console.log('matriz :  ' + JSON.stringify(matriz.nameRecipe));
        console.log('matriz :  ' + fieldName + ' ' + matriz[fieldName]);
        return matriz[fieldName];
      } else {
        for(vPunt in matriz) {
          var objectFather = matriz[vPunt];
          console.log('matriz :  ' + fieldName + ' ' + JSON.stringify(objectFather[fieldName]));
          return objectFather[fieldName];
        }
      }
      
    };
  })
  .filter('findField', function () {
    return function (matriz, nameField) {
      console.log('Longitud Matiz : ' + matriz.length);
      if ( matriz.length == undefined ) {
        return matriz[nameField];
      } else {
        var matrizField = matriz.map(function(vector){
          return vector[nameField];
        });
        return matrizField[0];
      }
    };
  })
  .filter('converMatriz', function() {
    return function ( bodyIngred) {
      var vPunt;
      var ingredientsArr=[];
      if ( bodyIngred.length == undefined) {
        for (vPunt in bodyIngred.ingredients) {
          ingredientsArr.push(bodyIngred.ingredients[vPunt]);
        }
      } else {
        for(vPunt in bodyIngred) {
          console.log('Paso por Aca');
          for(var key1 in bodyIngred[vPunt].ingredients) {
            ingredientsArr.push(bodyIngred[vPunt].ingredients[key1]);
          }
        }
      }
      return ingredientsArr;
    };
  });