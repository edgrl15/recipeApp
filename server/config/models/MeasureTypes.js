var mongoose = require('mongoose'),
    Schema     = mongoose.Schema;

// typesMeasureSchema
var measuresSchema = new Schema ({
    typeMeasure : String,
    descMeasure : String,
    date        : { type: Date, default: Date.now }
});

mongoose.model('Measures', measuresSchema);
