const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String
    },
    total_book:{
        type: Number,
        default:0
    },
    rank:{
        type: Number,
        default:0
    },
    status:{
        type:String
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

categorySchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Category", categorySchema);