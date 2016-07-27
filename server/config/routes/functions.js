var mongoose    = require('mongoose'),
    Recipes     = mongoose.model('Recipes'),
    Promise     = require('promise');

module.exports = {    
    oneRecipe   : function  (idRecipe) {
        console.log('functions oneRecipe');
        return new Promise(function (resolve, reject) {
            Recipes.find({_id : idRecipe }, function (err, resultRecipe) { 

                if (err) { 
                    return reject(err);
                } else {
                    return resolve(resultRecipe);
                }
            });
            
        });
    },
    findRecipe   : function (nameField, valueField) {
        console.log('functions findRecipe');
        var query = {};
        query[nameField] = valueField;
        return new Promise(function (resolve, reject){
            Recipes.find( query, '_id nameRecipe' , function (err, resultRecipe) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(resultRecipe);
                }
            });
        });
    },
    oneRecipeIngr: function (idRecipe, idIngred) {
        console.log('function onRecipeIngr');
        return new Promise(function (resolve, reject) {
            Recipes.find({ "_id"             : mongoose.Types.ObjectId(idRecipe),
                           "ingredients._id" : mongoose.Types.ObjectId(idIngred)},
                         { "ingredients.$"   : 1 } , function (err, resultRecipe) {
                               if (err) {
                                   return reject(err);
                               } else {
                                   return resolve(resultRecipe);
                               }
            });
        });
    },
    oneRecipeAndUpd: function (idRecipe, updatefield, totalCost) {
        console.log('function oneRecipeAndUpd');
        return new Promise(function (resolve, reject) {
                                     Recipes.findOneAndUpdate({ _id  :  mongoose.Types.ObjectId(idRecipe) },
                                                              { cost : totalCost }
                                                              , { new: true }
                                                              , function (err, resultRecipe) {
                                                                  if (err) {
                                                                      return reject(err);
                                                                  } else {
                                                                      return resolve(resultRecipe);
                                                                  }
                                                              });
        });
    }
};