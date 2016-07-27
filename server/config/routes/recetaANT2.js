var mongoose    = require('mongoose'),
    Recipes     = mongoose.model('Recipes'),
    func        = require('./functions');

module.exports = {
    all: function(req, res, next){
        console.log('we are in Receta.all');
        Recipes.find({}, function(err, result){
            if(err) { 
                console.log('Error : ' + err);
            } else {
                res.json(result);
            }
        });
    },
    viewOne: function(req, res, next){
        console.log('we are in Receta.all');
        Recipes.find({ _id: req.params.id }, function(err, result){
            if(err) { 
                console.log('Error : ' + err);
            } else {
                res.json(result);
            }
        });
    },
    create: function(req, res, next){
        console.log('we are in create');
        console.log('create req params : ' + JSON.stringify(req.params));
        console.log('create req body   : ' + JSON.stringify(req.body));
        
        var recipe = new Recipes(req.body);
        recipe.save(function (err, resultRecipe) {
            if(err) { 
                console.log('Error create : ' + err);
            } else {
                res.json(resultRecipe);
            }
        });
    },
    creIngr: function (req, res, next) {
        console.log('we are in creIngr : ');
        console.log('creIngr req params : ' + JSON.stringify(req.params));
        console.log('creIngr req body   : ' + JSON.stringify(req.body));
        Recipes.update( { _id: req.params.id }, {$push : { ingredients : req.body } }, function(err, result) {
            if(err) {
                console.log('Error creIngr: ' + err);
            } else {
                Recipes.find({ _id: req.params.id }, function(err, resultIngred){
                    if(err) { 
                        console.log('Error find creIngr + ' + err);
                    } else {
                        console.log('result creIngr : ' + JSON.stringify(resultIngred));
                        console.log('result creIngr2 : ' + JSON.stringify(resultIngred.ingredients));
                        console.log('result creIngr2 : ' + JSON.stringify(resultIngred.ingredients));
                        console.log(JSON.stringify(resultIngred['ingredients[]']));
                        res.json(resultIngred);
                    }
                });
            }
        });
    },
    costIngr: function(req, res, next) {
        console.log('we are in costIngr');
        console.log('Body : ' + JSON.stringify(req.body.costIngr));
        Recipes.findOneAndUpdate({ "_id"             : req.params.idRecipe,
                                   "ingredients._id" : req.params.idIngre},
                                 { "$set" : { 
                                     "ingredients.$.costIngr" : req.body.costIngr}
                                 }, function(err, resultRecipe){
            if(err) {
                console.log('Error costIngr : ' + err);
            } else {
                Recipes.find({ "_id"             : req.params.idRecipe,
                               "ingredients._id" : req.params.idIngre}, 'ingredients', function(err, resultIngred){
                    if(err) { 
                        console.log('Error find creIngr + ' + err);
                    } else {
                        console.log('result creIngr  : ' + JSON.stringify(resultIngred));
                        res.json(resultIngred);
                    }
                });
            }
        });
    },
    destroy: function(req, res, next){
        
        Recipes.findByIdAndRemove({ _id: req.params.id }, function(err, result){
            if (err) { 
                return next(err);
            } else {
                res.json(result);
            }
        });
    },
    calcRecipe: function(req, res, next) {
        console.log('params id : ' + req.params.id);
        Recipes.aggregate(
                          { $match : { _id: mongoose.Types.ObjectId(req.params.id) }},
                          { $unwind: "$ingredients" },
                          { $group : {
                                        _id      : '$_id',
                                        totalCost: { $sum: { $multiply : [ '$ingredients.cantIngredient', '$ingredients.costIngr' ] } }
                                     }
                          }, function (err, res) {
                              if (err) {
                                  console.log('err calcRecipe : ' + err);
                              } else {
                                  console.log('res calcRecipe : ' + JSON.stringify(res));
                                  Recipes.findOneAndUpdate({ _id: req.params.id },
                                  
                                                           { cost: res});
                                  
                              }
                          });
    }
};