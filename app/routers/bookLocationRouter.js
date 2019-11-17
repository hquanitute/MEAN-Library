const express = require('express');
const BookLocation = require('./../models/book_location');
var router = express.Router();

router.post("/",(req, res) => {
  let bookLocation = new BookLocation();
  bookLocation.name = req.body.name;
  bookLocation.description = req.body.description;
  bookLocation.save((err) => {
    if (err) {
      return res.json({
        success: false,
        message: "Khong them vi tri sach duoc"
      });
    }
    return res.json({
      success: true,
      message: "Them vi tri sach thanh cong"
    });
  });
}).get("/",function (req, res) {
    BookLocation.find(function (error, booklocations) {
    if (error) {
      return res.send(error);
    }
    res.json({"content":booklocations});
  });
}).get('/:bookLocation_id',(req,res)=>{
    BookLocation.findById(req.params.bookLocation_id,(err,bookLocation)=>{
    if(err){
      return res.send(err);
    }
    res.json(bookLocation);
  });
}).put('/:bookLocation_id',(req,res)=>{
    BookLocation.findById((req.params.bookLocation_id), (err,bookLocation)=>{
    if(err){
      return err;
    } 
    if (req.body.name) {
        bookLocation.name = req.body.name;
    }
    if (req.body.description) {
        bookLocation.description = req.body.description;
    }
    bookLocation.save((err)=>{
      if(err){
        return res.send(err);
      }
      res.json({
        success:true,
        message:"Da cap nhap sach"
      })
    });
})}).delete("/:book_id",(req,res)=>{
    BookLocation.remove({_id:req.params.book_id},(err)=>{
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