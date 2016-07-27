var mongoose    = require('mongoose'),
    Recipes     = mongoose.model('Recipes'),
    func        = require('./functions');

module.exports = {
    viewOne: function(req, res, next){
        console.log('we are in Receta.all');
        func.oneRecipe(req.params.id)
          .then(result => res.json(result))
          .catch(err   => console.log('Error en viewOne : ' + err.message));
    },
    viewRecipeUser: function(req, res, next) {
        console.log('we are in viewRecipeUser');
        func.findRecipe('ownerRecipe', req.params.userLogin)
          .then(result => res.json(result))
          .catch(err   => console.log('Error en viewRecipeUser : ' + err.message));
    },
    create: function(req, res, next){
        console.log('we are in create');
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
        Recipes.update( { _id: req.params.id }, {$push : { ingredients : req.body } }, function(err, result) {
            if(err) {
                console.log('Error creIngr: ' + err);
            } else {
                func.oneRecipe(req.params.id)
                  .then(resultRecipe => res.json(resultRecipe))
                  .catch(err         => console.log('Error en creIngr : ' + err.message));
            }
        });
    },
    costIngr: function(req, res, next) {
        console.log('we are in costIngr');
        Recipes.findOneAndUpdate({ "_id"             : req.params.idRecipe,
                                   "ingredients._id" : req.params.idIngre},
                                 { "$set" : { 
                                     "ingredients.$.costIngr" : req.body.costIngr,
                                     "ingredients.$.costUpd"  : true
                                 }}, function(err, resultRecipe){
            if(err) {
                console.log('Error costIngr : ' + err);
            } else {
                func.oneRecipe(req.params.idRecipe)
                  .then(resultRecipe => {res.json(resultRecipe)})
                  .catch(err         => {console.log('Error en costIngr : ' +  err.message)});
            }
        });
    },
    deleteReci: function(req, res, next){
        Recipes.findByIdAndRemove( { _id : req.params.idRecipe }
                                  ,function (err, resultRecipe) {
                                      if(err) {
                                          console.log('Error deleteIngr : ' + err);
                                      } else {
                                          console.log('Receta Eliminada!!!');
                                      }
                                  });
    },
    deleteIngr: function(req, res, next){
        
        Recipes.update({ _id             : req.params.idRecipe },
                         { $pull : {ingredients: { _id : req.params.idIngre }}
                       }, function (err, resultRecipe) {
                           if(err) {
                               console.log('Error deleteIngr : ' + err);
                           } else {
                               func.oneRecipe(req.params.idRecipe)
                                 .then(resultRecipe => {console.log('resultRecipe : ' + resultRecipe);
                                                        return res.json(resultRecipe)})
                                 .catch(err         => {console.log('Error en costIngr : ' +  err.message)});
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
                          }, function (err, resTotCost) {
                              if (err) {
                                  console.log('err calcRecipe : ' + err);
                              } else {
                                  console.log('res calcRecipe : ' + resTotCost[0].totalCost);
                                  func.oneRecipeAndUpd(req.params.id, 'cost', resTotCost[0].totalCost)
                                    .then(resultRecipe => {console.log('resultRecipe : ' + JSON.stringify(resultRecipe));
                                                           return res.json(resultRecipe)})
                                    .catch(err         => {console.log('Error en calcRecipe : ' +  err.message)});
                              }
                          });
    }
};