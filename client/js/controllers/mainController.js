angular.module('myRecetaApp')
  .controller('mainController', [ '$scope', '$window', '$filter', 'LoginFactory', 'RecetaFactory', 
              function ($scope, $window, $filter, LoginFactory, RecetaFactory) {
    var vPuntArray;
    var vVector;
    var vVectorNext;
    var vPuntArrayNext;
    
    this.tabs = [ 
            {
              idVent         : 1,
              title          : 'Nueva Receta',
              content        : 'Crear nueva receta y/o plato',
              tabTemp        : 'Y',
              template       : '/addRecipe',
              backTemplate   : '',
              backTemplName  : 'Incio',
              fowardTemplate : '/editIngredient',
              fowardTemplName: 'Costo Ingrediente(s)'
            },
            {
              idVent         : 2,
              title          : 'Datos',
              content        : 'Informacion de Datos Cuenta',
              tabTemp        : 'Y',
              template       : '/'
            },
            {
              idVent         : 3,
              title          : 'Estandar de Medidas',
              content        : 'Algunas medidas estandarizadas',
              tabTemp        : 'Y',
              template       : '/mesureStandar'
            },
            {
              idVent         : 4,
              title          : 'Costo Ingrediente(s)',
              content        : 'Costos de Ingrediente(s)',
              tabTemp        : 'N',
              template       : '/editIngredient',
              backTemplate   : '/addRecipe',
              backTemplName  : 'Datos Receta',
              fowardTemplate : '/costRecipe',
              fowardTemplName: 'Costo Receta'
            },
            {
              idVent         : 5,
              title          : 'Costo Receta/Plato',
              content        : 'Costos de Receta o Plato',
              tabTemp        : 'N',
              template       : '/costRecipe',
              backTemplate   : '/editIngredient',
              backTemplName  : 'Costo Ingrediente(s)',
              fowardTemplate : '/addRecipe',
              fowardTemplName: 'Incio'
            }
            
        ];
    $scope.recipe     = {};
    $scope.princTempl = true;
    
    /**
     * Primera parte de Template
     * donde se selecciona un receta en caso de estar conectado
     * o se calcula una nueva receta
     */
     
    function isConnected(userLog) {
      if ( userLog == "" ) {
        return false;
      } else {
         return true;
      }
    }
    
    function recipeUser (account) {
      return RecetaFactory.findRecipeOwner(account)
        .then(function(response) {
          console.log('Owner Recipe : ' + JSON.stringify(response.data));
          $scope.Recipes = response.data;
      });
    }
    
    $scope.CalcNvaReci = function() {
      console.log('Paso por CalcNvaReci!!!' + LoginFactory.diable4Login);
      if (LoginFactory.diable4Login == false) {
        $scope.princTempl = false;
      }
    };
    
    $scope.isUserConnected = isConnected(LoginFactory.userLog);
    
    $scope.$watch(function() {
      return LoginFactory.diable4Login;
    }, function(NewValue, OldValue) {
        console.log('diable4Login NewValue : '+ NewValue + ' OldValue : ' + OldValue);
        $scope.isDisable4Login = NewValue;
    });
    
    $scope.$watch(function() {
      return LoginFactory.userLog;
      }, function(NewValue, OldValue){
        console.log('userLog NewValue : '+ NewValue + ' OldValue : ' + OldValue);
        $scope.isUserConnected = isConnected(NewValue);
        if ($scope.isUserConnected == true ) {
          recipeUser(NewValue);
        }
        /*if ( $scope.isUserConnected == true ) {
          RecetaFactory.findRecipeOwner(NewValue)
            .then(function(response){
              console.log('Owner Recipe : ' + JSON.stringify(response));
              $scope.Recipes = response.data;
          }),function(err) {
            console.log('Error findRecipeOwner : ' + err);
          };
        }*/
    });
    
    $scope.redirect = function (routeTemplate) {
      if( $scope.isDisable4Login == false) { 
        $window.location.href = routeTemplate;
      }
    };
    
    $scope.removeRecipe = function(idRecipe) {
      RecetaFactory.deleteRecipe(idRecipe);
      recipeUser(LoginFactory.userLog);
    };
    
    $scope.updActive   = function(idRecipe) {
      RecetaFactory.findOneRecipe(idRecipe)
        .then(function(response) {console.log('findOneRecipe idRecipe : ' + idRecipe + ' Result : ' + JSON.stringify(response.data));
                                  $scope.princTempl = false;
                                  console.log('recetaID : ' + RecetaFactory.recetaID);
                                  RecetaFactory.recetaID   = response.data[0]._id;
                                  RecetaFactory.recetaData = response.data;
                                  console.log('recetaID : ' + RecetaFactory.recetaID);
        })
        ,function(err) {console.log('Error findOneRecipe : ' + err)};
    };
    
    
    /**
     * Segunda Parte del template
     * donde se procede a cargar la Receta o Plato
     */        
    $scope.tabs          = this.tabs;
    $scope.currentTab    = this.tabs[0].template;
    $scope.nameBack      = this.tabs[0].backTemplName;
    $scope.nameFoward    = this.tabs[0].fowardTemplName;
    
    $scope.onClickTab = function (tab) {
        console.log('Datos Entrada        : ' + tab.template);
        console.log('Current Tab ClickTab : ' + $scope.currentTab);
        $scope.currentTab = tab.template;
        vPuntArray        = searchArry(this.tabs, tab.template);
        console.log('nameFoward : ' +  this.tabs[vPuntArrayNext].fowardTemplName);
        $scope.nameFoward = this.tabs[vPuntArray].fowardTemplName;
        $scope.nameBack   = this.tabs[vPuntArray].backTemplName;
    };
    
    $scope.isActiveTab = function (tabTempl) {
        return tabTempl == $scope.currentTab;
    };
    
    var searchArry = function(pArray, value) {
      return pArray.filter((vector) => vector.template === value);
    };
    
    var obtainValue = function(pVector, field) {
      return pVector.reduce((value, vector) => vector[field],"");
    };

    
    
    $scope.backButton = function (templateAct) {
      console.log('Current function backButton');
      vVector = searchArry(this.tabs, templateAct);
      
      if ( $scope.nameBack === 'Incio') {
        $scope.princTempl = true;
        RecetaFactory.cleanRecipe();
        if (LoginFactory.isUserConnected == true ) {
          recipeUser(LoginFactory.userLog);
        }
      } else {
        $scope.currentTab = obtainValue(vVector,  'backTemplate');
        vVectorNext       = searchArry(this.tabs, $scope.currentTab);
        $scope.nameFoward = obtainValue(vVectorNext, 'fowardTemplName');
        $scope.nameBack   = obtainValue(vVectorNext, 'backTemplName');
      }
    };
    
    $scope.fowardButton = function (templateAct) {
      console.log('Current function fowardCostIngr');
      console.log('RecetaFactory.recetaID   : ' + RecetaFactory.recetaData._id);
      if ( RecetaFactory.recetaData._id === "" || RecetaFactory.recetaData._id == undefined ) {
        alert('Debe Introducir un Nombre Receta y al menos un Ingrediente');
      } else {
        if ( $scope.nameFoward === 'Incio') {
          $scope.princTempl = true;
          RecetaFactory.cleanRecipe();
          if (LoginFactory.isUserConnected == true ) {
          recipeUser(LoginFactory.userLog);
          }
        } else if ( templateAct == '/editIngredient' ) {
          console.log('templateAct : ' + templateAct);
        }
        vVector           = searchArry(this.tabs, templateAct);
        $scope.currentTab = obtainValue(vVector,  'fowardTemplate');
        vVectorNext       = searchArry(this.tabs, $scope.currentTab);
        $scope.nameFoward = obtainValue(vVectorNext, 'fowardTemplName');
        $scope.nameBack   = obtainValue(vVectorNext, 'backTemplName');
      }
    };
      
  }]);