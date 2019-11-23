const express = require('express');
const Book = require('./../models/book');
var router = express.Router();
const jwtCheck = require('./../middlewares/jwtCheck');
router.post("/",(req, res) => {
  let book = new Book();
  book.name = req.body.name;
  book.short_description = req.body.short_description;
  book.save((err) => {
    if (err) {
      return res.json({
        success: false,
        message: "Khong them sach duoc"
      });
    }
    return res.json({
      success: true,
      message: "Them sach thanh cong"
    });
  });
}).get("/",jwtCheck(2), function (req, res) {
  Book.find(function (error, books) {
    if (error) {
      return res.send(error);
    }
    res.json({"content":books});
  });
}).get('/:book_id',(req,res)=>{
  Book.findById(req.params.book_id,(err,book)=>{
    if(err){
      return res.send(err);
    }
    res.json(book);
  });
}).put('/:book_id',(req,res)=>{
  Book.findById((req.params.book_id), (err,book)=>{
    if(err){
      return err;
    } 
    if (req.body.name) {
      book.name = req.body.name;
    }
    if (req.body.short_description) {
      book.short_description = req.body.short_description;
    }
    book.save((err)=>{
      if(err){
        return res.send(err);
      }
      res.json({
        success:true,
        message:"Da cap nhap sach"
      })
    });
})}).delete("/:book_id",(req,res)=>{
  Book.remove({_id:req.params.book_id},(err,book)=>{
    if(err){
      return res.send(err);
    }
    res.json({
      success:true,
      message:"Da xoa thanh cong sach"
    })
  });
});

module.exports = router;