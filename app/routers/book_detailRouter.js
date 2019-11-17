const express = require('express');
const Book_detail = require('./../models/book_detail');
const Book =require('./../models/book');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId; 

router.post("/", (req, res) => {
    const date = new Date();
    let book_detail = new Book_detail();
    book_detail.lsCategories = req.body.lsCategories;
    book_detail.publisher = req.body.publisher;
    book_detail.language = req.body.language;
    book_detail.book_location = req.body.book_location;
    book_detail.author = req.body.author;
    book_detail.book = req.body.book;
    book_detail.create_date = date;
    book_detail.update_date = date;
    book_detail.save((err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Khong them book_detail duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them book_detail thanh cong"
        });
    });
}).get("/", function (req, res) {
    Book_detail.find(function (error, book_details) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":book_details});
    });
}).get('/:book_detail_id', (req, res) => {
    Book_detail.findById(req.params.book_detail_id, (err, book_detail) => {
        if (err) {
            return res.send(err);
        }
        res.json(book_detail);
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
    Book_detail.findOne({book: req.params.id},(err,book_detail1) =>{
        if (err) {
            return res.send(err);
        }
        res.json(
            book_detail1
        )
    })
});

module.exports = router;