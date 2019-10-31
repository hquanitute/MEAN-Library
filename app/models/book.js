const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:{
        type: String
    },
    isbn:{
        type: String
    },
    short_description:{
        type: String
    },
    long_description:{
        type:String
    },
    cover_price:{
        type: Number
    },
    click_view:{
        type: Number
    },
    thumbnail:{
        type:String
    },
    number_page:{
        type:Number
    },
    page_size:{
        type:String
    },
    reprint:{
        type:Number
    },
    released_time:{
        type:Number
    },
    status:{
        type:String
    },
    releaseDate:{
        type: Date
    },
    amount_book:{
        type:Number
    },
    reviews:{
        type:Array
    },
    create_date:{
        type: Date
    },
    update_date:{
        type: Date
    }

});

bookSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Book", bookSchema);