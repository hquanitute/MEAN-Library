const express = require('express');
const Book = require('./../models/book');
const Book_detail = require('./../models/book_detail');
const option = require('./../middlewares/queryOption')

var router = express.Router();
const jwtCheck = require('./../middlewares/jwtCheck');
router.post("/",(req, res) => {
  let book = new Book();
  book.name = req.body.name;
  book.short_description = req.body.short_description;
  book.cover_price = req.body.cover_price;
  book.thumbnail = req.body.thumbnail;
  book.number_page = req.body.number_page;
  book.amount_book = req.body.amount_book;
  
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
}).get("/",option(), function (req, res) {
  Book.find({},{},req.option,function (error, books) {
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
}).get("/category/:id",(req,res) =>{
  Book_detail.find({lsCategories: req.params.id},(err,book_detail) =>{
      if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          return res.send(err);
      }
      return book_detail;
  }).then(data=>{
    let listID = data.map(x=>x.book);
    Book.find({"_id":{$in:listID}}).then(x=>res.json(x))
    // console.log(listID);
  })
});

router.get('/paginate',(req,res)=>{
  Book.paginate({},{})
})

module.exports = router;