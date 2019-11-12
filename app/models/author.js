const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name:{
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

authorSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Author", authorSchema);