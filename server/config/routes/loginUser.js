var mongoose    = require('mongoose'),
    userApp     = mongoose.model('userApp');

module.exports = {
    loginUser: function(req, res, next) {
        var salida = "";
        console.log('we are in loginUser : ' + JSON.stringify(req.body));
        userApp.getAuthenticated(req.body, function(err, user, reason) {
            console.log('reason : ' + JSON.stringify(reason));
            if (err) throw err;

            // login was successful if we have a user
            console.log('user : ' + user);
            if (user) {
                // handle login success
                console.log('login success');
                salida={ cod_salida: 0, messa : "OK" };
                return res.json(salida);
            }
            
            var reasons = userApp.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                    console.log('No existe el Usuario : ' + req.body.userOwner);
                    salida={ cod_salida: 1, messa : "No existe una cuenta con  : " + req.body.userOwner };
                    return res.json(salida);
                case reasons.PASSWORD_INCORRECT:
                    salida={ cod_salida: 1, messa : "Constraseña no coincide para el usuario  : " + req.body.userOwner };
                    return res.json(salida);
                case reasons.MAX_ATTEMPTS:
                    break;
            }
        });
    },
    createUser: function(req, res, next) {
        console.log('we are in createUser : ' + JSON.stringify(req.body));
        var user = new userApp(req.body);
        user.save(function(err, resultOwner) {
          if (err) {
            console.log('Error saveUser : ' + err);
          } else {
            console.log('resultOwner createUser : ' + JSON.stringify(resultOwner));
            return res.json(resultOwner);
          }
        });
    }
};