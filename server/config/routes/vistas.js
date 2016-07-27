module.exports = {
    login: function(req, res, next) {
        console.log('Routes vistas login');
        res.render('login/login');
    },
    optCalcReci: function(req, res, next) {
        console.log('Router vistas optCalcNewRecipe');
        res.render('optCalcRec', {title : 'Opcion Principal' });
    },
    viewCreaReci: function(req, res,next) {
        console.log('Router vistas viewCreaRect');
        res.render('recetaViews/nvaReceta', { title : 'Receta Plato' });
    },
    createReci: function(req, res, next) {
        console.log('Router vistas crearRect');
        res.render('recetaViews/addReceta', { pesta_a : 'Crear Receta'});
    },
    costIngr: function(req, res, next) {
        console.log('Router vistas costRect');
        res.render('recetaViews/costIngred');
    },
    listReci: function(req, res,next) {
        console.log('Router vistas listRect');
        res.render('recetaViews/listReceta', { title : 'Receta Plato' });
    },
    costReci: function(req, res, next) {
        console.log('Router vistas costRect');
        res.render('recetaViews/costRecipe');
    }
};