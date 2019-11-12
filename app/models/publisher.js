const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
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

publisherSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Publisher", publisherSchema);