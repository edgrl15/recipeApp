var mongoose = require('mongoose'),
    Measures = mongoose.model('Measures');

module.exports = {
    allTyMeasure: function(req, res, next){
      console.log('we are in Receta.allTyMesupre');  
      Measures.find({}, function (err, result){
         if(err) {
             console.log('Error : ' + err);
         }
         //console.log('result : ' + JSON.stringify(result));
         return res.json(result);
      });
    }
};