const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String
    },
    total_book:{
        type: Number
    },
    rank:{
        type: Number
    },
    status:{
        type:String
    },
    create_date:{
        type: Date
    },
    update_date:{
        type: Date
    }

});

categorySchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Category", categorySchema);