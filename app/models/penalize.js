const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penalizeSchema = new Schema({
    reason:{
        type: String
    },
    user_id:{
        type: String
    },
    editor_id:{
        type: String
    },
    penalize_date:{
        type: Date,
        default: Date.now
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

module.exports = mongoose.model("Penalize", penalizeSchema);