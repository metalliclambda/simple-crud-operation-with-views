const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },

    countryId : {
        type : String,
        ref : 'Country',
        required : true
    }
});

module.exports = mongoose.model('Region', regionSchema);
