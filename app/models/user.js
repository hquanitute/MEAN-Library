const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId:{
        type: String
    },
    facebookId:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    name:{
        type: String
    },
    status:{
        type: String
    },
    gender:{
        type: String
    },
    role:{
        type: String,
        default:"user"
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    register_code:{
        type: String
    },
    penalize_card:{type: mongoose.Schema.Types.ObjectId, ref: 'penalizes'},
    borrowing_card:{type: mongoose.Schema.Types.ObjectId, ref: 'borrowing_details'},
    create_date:{
        type: Date,
        default: Date.now
    },
    update_date:{
        type: Date,
        default: Date.now
    }

});

userSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("User", userSchema);