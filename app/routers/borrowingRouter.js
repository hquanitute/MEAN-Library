const express = require('express');
const Borrowing_card = require('./../models/borrowing-card-detail');
var router = express.Router();
const option = require('./../middlewares/queryOption')
const Book = require('./../models/book');

router.post("/", (req, res) => {
    const date = new Date();
    let borrowing_card = new Borrowing_card();
    let bookId= req.body.book_id
    borrowing_card.book_id = bookId.toString().split(",");
    borrowing_card.user_id = req.body.user_id;
    borrowing_card.type = req.body.type;
    borrowing_card.status = req.body.status;
    borrowing_card.editor_id = req.body.editor_id;
    Borrowing_card.create(borrowing_card).then((object,err)=>{
        if(err){
            return res.json({
                success: false,
                message: err
            });
        }
        if(object){
            object.book_id.map(bookId=>{
                Book.findById(bookId,(err,book)=>{
                    book.amount_book-=1;
                    book.save();
                })
            })
            return res.json({
                success: true,
                message: "Them borrowing_card thanh cong",
                phieumuon:object
            });
        }
    })
    
}).get("/",option(), function (req, res) {
    Borrowing_card.find({},{},req.option,function (error, borrowing_cards) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":borrowing_cards});
    });
}).get('/:borrowing_card_id', (req, res) => {
    Borrowing_card.findById(req.params.borrowing_card_id, (err, borrowing_card) => {
        if (err) {
            return res.send(err);
        }
        res.json(borrowing_card);
    });
}).put('/:borrowing_card_id', (req, res) => {
    Borrowing_card.findById((req.params.borrowing_card_id), (err, borrowing_card) => {
        if (err) {
            return err;
        }
        if (req.body.book_id) {
            borrowing_card.book_id = req.body.book_id;
        }
        if (req.body.user_id) {
            borrowing_card.user_id = req.body.user_id;
        }
        if (req.body.type) {
            borrowing_card.type = req.body.type;
        }
        if (req.body.status) {
            borrowing_card.status = req.body.status;
        }
        borrowing_card.update_date = new Date();
        borrowing_card.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap borrowing_card"
            })
        });
    })
}).delete("/:borrowing_card_id", (req, res) => {
    Borrowing_card.remove({ _id: req.params.borrowing_card_id }, (err, borrowing_card) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong borrowing_card"
        })
    });
});

module.exports = router;