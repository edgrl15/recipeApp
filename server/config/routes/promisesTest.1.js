var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'development';
var envConfig = require('../env')[env];
require('../config')(app, envConfig);
require('../database')(envConfig);

var mongoose    = require('mongoose'),
    Recipes     = mongoose.model('Recipes'),
    Promise     = require('promise');
    
var findOneRecipe = function  (id) {
    return new Promise(function (resolve, reject) {
        Recipes.find({_id : id }, function (err, result) { 
            if (err) { 
                return reject(err);
            } else {
                console.log('result : ' + result);
                return resolve(result);
            }
        });
    });
    
};

var oneRecipeAndUpd =  function (idRecipe, updatefield, totalCost) {
        console.log('function oneRecipeAndUpd');
        return new Promise(function (resolve, reject) {
                                     Recipes.findOneAndUpdate({ _id         : idRecipe },
                                                              { updatefield : totalCost },
                                                              { upsert: false }, function (err, resultRecipe) {
                                                                  if (err) {
                                                                      return reject(err);
                                                                  } else {
                                                                      return resolve(resultRecipe);
                                                                  }
                                                              });
        });
};

//console.log(findOneRecipe('5754d13b5d02d90d29d451d2'));
oneRecipeAndUpd('5754d13b5d02d90d29d451d2','cost', 50)
  .then(resultRecipe => console.log('bien : ' + resultRecipe))
  .catch(err         => console.log('Mal  : ' + err.message));

