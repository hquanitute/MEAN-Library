const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    name:{
        type: String
    },
    note:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    },
    update_date:{
        type: Date,
        default: Date.now
    }

});

languageSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Language", languageSchema);