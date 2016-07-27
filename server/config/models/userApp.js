var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema,
    bcrypt           = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;


// recetaSchem
var userAppSchema = new Schema ({
    userOwner   : { type : String , required : true, index: { unique: true } },
    passOwner   : { type : String , required : true },
    nameOwner   : String,
    dateCreate  : { type : Date, default : Date.now }
});

userAppSchema.pre('save', function (next) {
    var user = this;
    console.log('Esta en Pre createUser!!!' + JSON.stringify(user));
    console.log("");

    // solo hash then password si ha sigo modificado o es nuevo
    if ( !user.isModified('passOwner')) return next();
    
    // generar el salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        
        //hash el password con el nuevo salt
        bcrypt.hash(user.passOwner, salt, function(err, hash) {
            if (err) return next(err);
                
            //sobre escribe el password con el hash
            user.passOwner = hash;
            next();
        });
    });
});

userAppSchema.methods.comparePassword = function(evalPassw, cb) {
    bcrypt.compare(evalPassw, this.passOwner, function(err, isMatch) {
        if (err) return cb(err);
        
        cb(null, isMatch);
    });
};

var reasons = userAppSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

userAppSchema.statics.getAuthenticated = function(evalUser, cb) {
    console.log('we are in getAuthenticated!!!');
    this.findOne( { userOwner : evalUser.userOwner }, function(err, userLogin) {
        if(err) return cb(err);
        
        // En caso de no existir el usuario
        if(!userLogin) {
            return cb(null, null, reasons.NOT_FOUND);
        }
        
        // Comparacion de clave del usuario
        userLogin.comparePassword(evalUser.passOwner, function(err, compareOk) {
            if (err) return cb(reasons.NOT_FOUND);
            
            console.log('compareOk : ' + compareOk);
            if(compareOk) {
                return cb(null, userLogin);
            } else {
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            }
        });
    });
};

mongoose.model('userApp', userAppSchema);