var mongoose = require('mongoose'),
    Schema     = mongoose.Schema;


// recetaSchem
var recipesSchema = new Schema ({
    nameRecipe  : String,
    ownerRecipe : String,
    ingredients : [{ nameIngredient: String, 
                     cantIngredient: Number,
                     typeMeasure   : String,
                     costUpd       : { type : Boolean, default: false },
                     costIngr      : { type : Number , default: 0 },
                     date          : { type : Date   , default: Date.now } }],
    cost        : { type: Number, default: 0 },
    date        : { type: Date  , default: Date.now }
});

mongoose.model('Recipes', recipesSchema);
