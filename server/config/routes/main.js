module.exports = {
    index: function(req, res) {
        console.log('Paso por index');
        res.render('main' , { title : 'Receta Plato' });
    }
};