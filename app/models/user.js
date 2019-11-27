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
        type: String,
        default:"New user"
    },
    status:{
        type: String,
        default:"Active"
    },
    gender:{
        type: String,
        default:"Nam"
    },
    role:{
        type: String,
        default:"user"
    },
    phone:{
        type: String,
        default:"0123456789"
    },
    email:{
        type: String,
        default:"abc@gmail.com"
    },
    register_code:{
        type: String,
        default: Math.floor(Date.now() / 1000).toString()
    },
    // penalize_card:{type: mongoose.Schema.Types.ObjectId, ref: 'penalizes'},
    // borrowing_card:{type: mongoose.Schema.Types.ObjectId, ref: 'borrowing_details'},
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