const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    isbn:{
        type: String,
        default:"book"+Math.floor(Date.now() / 1000).toString()
    },
    short_description:{
        type: String,
        default: "This book have not set description"
    },
    long_description:{
        type:String,
        default: "This book have not set more description"
    },
    cover_price:{
        type: Number,
        default:0
    },
    click_view:{
        type: Number,
        default:0
    },
    thumbnail:{
        type:String,
        default:"http://www.mydaymyplan.com/images/no-image-large.png"
    },
    number_page:{
        type:Number
    },
    page_size:{
        type:String,
        default:"16x9"
    },
    reprint:{
        type:Number,
        default:0
    },
    released_time:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        default: "ACTIVE"
    },
    releaseDate:{
        type: Date,
        default: Date.now()
    },
    amount_book:{
        type:Number
    },
    reviews:{
        type:Array
    },
    create_date:{
        type: Date,
        default: Date.now()
    },
    update_date:{
        type: Date,
        default: Date.now()
    }

});

bookSchema.pre('save', function(next){
    return next();
});

bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Book", bookSchema);