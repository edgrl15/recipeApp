var mongoose    = require('mongoose'),
    userApp     = mongoose.model('userApp'),
    Promise     = require('promise');

module.exports = {
    saveUser: function(userLogin) {
        console.log('we are in saveUser!!!');
        return new Promise(function (resolve, reject) {
            userApp.save(function(err, resultOwner) {
                if (err) {
                    console.log('Error saveUser : ' + err);
                } else {
                    console.log('resultOwner : ' + JSON.stringify(resultOwner));
                    return resultOwner;
                }
            });
        });
    }
};