const express = require('express');
const Book_detail = require('./../models/book_detail');
const Review =require('./../models/review');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId; 
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let book_detail = new Book_detail();
    book_detail.lsCategories = req.body.lsCategories;
    book_detail.publisher = req.body.publisher;
    book_detail.language = req.body.language;
    book_detail.book_location = req.body.book_location;
    book_detail.author = req.body.author;
    book_detail.book = req.body.book;
    Book_detail.create(book_detail).then((book_detail,err)=>{
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        return res.json({
            success: true,
            message: "Them book_detail thanh cong"
        });
    })
}).get("/",option(), function (req, res) {
    Book_detail.find({},{},req.option)
    .populate('reviews')
    .populate('lsCategories')
    .populate('publisher')
    .populate('language')
    .populate('book_location')
    .populate('author')
    .populate('book')
    .exec((err,book_details)=>{
        if (err) {
            console.log(err)
        }
        return res.json({"content":book_details});
    });
}).get('/:book_detail_id', (req, res) => {
    Book_detail.findById(req.params.book_detail_id, (err, book_detail) => {
        if (err) {
            return res.send(err);

        }
        return res.json(book_detail);
    });
}).put('/:book_detail_id', (req, res) => {
    Book_detail.findById((req.params.book_detail_id), (err, book_detail) => {
        if (err) {
            return err;
        }
        if (req.body.lsCategories) {
            book_detail.lsCategories = req.body.lsCategories;
        }
        if (req.body.publisher) {
            book_detail.publisher = req.body.publisher;
        }
        if (req.body.language) {
            book_detail.language = req.body.language;
        }
        if (req.body.book_location) {
            book_detail.book_location = req.body.book_location;
        }
        if (req.body.author) {
            book_detail.author = req.body.author;
        }
        if (req.body.book) {
            book_detail.book = req.body.book;
        }
        book_detail.update_date = new Date();
        book_detail.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap book_detail"
            })
        });
    })
}).delete("/:book_detail_id", (req, res) => {
    Book_detail.remove({ _id: req.params.book_detail_id }, (err, book_detail) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong book_detail"
        })
    });
}).get("/book/:id",(req,res) =>{
    Book_detail.find({book:req.params.id})
    .populate('lsCategories')
    .populate('publisher')
    .populate('language')
    .populate('book_location')
    .populate('author')
    .populate('book')
    .exec((err,book_details)=>{
        if (err) {
            console.log(err)
        }
        return res.json({"content":book_details});
    });
}).post("/comment",(req,res)=>{
    Book_detail.findById((req.body.book_detail_id), (err, book_detail) => {
        if(err){
            return res.json({
                success:false,
                message:"Loi post comment"
            });
        }
        if(book_detail){
            

            book_detail.reviews.push(new Review({
                comment:req.body.body,
                user:req.body.user}))
            book_detail.save();
            return res.json({
                success:true,
                message:"Comment thanh cong"
            })
        } 
        else{
            return res.json({
                success:false,
                message:"Book Detail not found"
            })
        }
    })
});

module.exports = router;