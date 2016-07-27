var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// ingredientesSchema
var ingredientsSchema = new Schema ({
    ingredient  : String,
    quantity    : Number,
    measure     : String,
    recipes     : {type:mongoose.Schema.Types.ObjectId, ref: 'Recipes'}
});
mongoose.model('Ingredient', ingredientsSchema);