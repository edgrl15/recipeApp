var mongoose = require('mongoose');

module.exports = function(envConfig){
    // register models
    require('./models/RecetaPlato');
    require('./models/MeasureTypes');
    require('./models/userApp');

    // connect to database
    mongoose.connect(envConfig.database, function(){
        console.log('connected to database!');
    });
};