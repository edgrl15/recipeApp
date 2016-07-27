var express = require('express');

module.exports = function(app){
    // register route controllers
    var main         = require('./routes/main');
    var receta       = require('./routes/receta');
    var vistas       = require('./routes/vistas');
    var measure      = require('./routes/measure');
    var login        = require('./routes/loginUser');
    var recetaRouter = express.Router();
    app.use('/receta', recetaRouter);
    
    
    app.get('/', main.index);
    app.get('/views/login',    vistas.login);
    app.get('/views/optCalc',  vistas.optCalcReci);
    app.get('/recetaNva',      vistas.viewCreaReci);
    app.get('/addRecipe',      vistas.createReci);
    app.get('/editIngredient', vistas.costIngr);
    app.get('/recetaList',     vistas.listReci);
    app.get('/costRecipe',     vistas.costReci);
    
    // Rutas Receta
    recetaRouter.get('/:id',                            receta.viewOne);
    recetaRouter.get('/owner/:userLogin',               receta.viewRecipeUser);
    recetaRouter.post('/creaReceta',                    receta.create);
    recetaRouter.post('/creaIngre/:id',                 receta.creIngr);
    recetaRouter.post('/updatIngre/:idRecipe/:idIngre', receta.costIngr);
    recetaRouter.post('/destroy/:idRecipe',             receta.deleteReci);
    recetaRouter.post('/destroy/:idRecipe/:idIngre',    receta.deleteIngr);
    recetaRouter.post('/updatCostRecipe/:id',           receta.calcRecipe);
    // Rutas Login
    app.post('/login',                                  login.loginUser);
    app.post('/login/signup',                           login.createUser);
    //
    app.get('/allMeasure', measure.allTyMeasure);
    
};