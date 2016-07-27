angular.module('myRecetaApp')
  .controller('tabsController', [ '$scope', 'RecetaFactory', function ($scope, RecetaFactory) {
    var vPuntArray;
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
              fowardTemplate : '/',
              fowardTemplName: 'No Activo'
            }
            
        ];
        
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
    
    function idTab (pArray, ptemplAct) {
        return pArray.map(function(pVector) {
            if (pVector.template === ptemplAct) {
                return pVector.idVent;
            }
        });
    }
    
    
    function searchArry(pArray, ptemplAct) {
      var nameTabAct;
      console.log('Current Function searchArry');
      for (var i =0; i <= pArray.length; i++) {
        nameTabAct = pArray[i].template;
        console.log('Position : [' + i + '] => ' + nameTabAct + ' === ' + ptemplAct);
        if ( nameTabAct === ptemplAct) {
          return i;
        }
      }
    }
    $scope.backButton = function (templateAct) {
      console.log('Current function backButton');
      vPuntArray        = searchArry(this.tabs, templateAct);
      if (this.tabs[vPuntArray].backTemplName === 'Incio') {
        console.log('backTemplate : ' + this.tabs[vPuntArray].backTemplate);
        var addHref = document.getElementById('backButton');
        addHref.setAttribute('href',this.tabs[vPuntArray].backTemplate);
        
      } else {
         $scope.currentTab = this.tabs[vPuntArray].backTemplate;
         console.log('idTab : ' + idTab);
         vPuntArrayNext    = searchArry(this.tabs, $scope.currentTab);
         $scope.nameFoward = this.tabs[vPuntArrayNext].fowardTemplName;
         $scope.nameBack   = this.tabs[vPuntArrayNext].backTemplName;
      }
    };
    
    $scope.fowardCostIngr = function (templateAct) {
      console.log('Current function fowardCostIngr');
      
      if ( RecetaFactory.recetaID   === "" || RecetaFactory.recetaData === "" ) {
        alert('Debe Introducir un Nombre Receta y al menos un Ingrediente');
      } else {
        vPuntArray        = searchArry(this.tabs, templateAct);
        
        $scope.currentTab = this.tabs[vPuntArray].fowardTemplate;
        vPuntArrayNext    = searchArry(this.tabs, $scope.currentTab);
        $scope.nameFoward = this.tabs[vPuntArrayNext].fowardTemplName;
        $scope.nameBack   = this.tabs[vPuntArrayNext].backTemplName;
      }
    };
    
}]);