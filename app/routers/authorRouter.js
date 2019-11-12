const express = require('express');
const Author = require('./../models/author');
var router = express.Router();

router.post("/", (req, res) => {
    let author = new Author();
    author.name = req.body.name;
    author.save((err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Khong them author duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them author thanh cong"
        });
    });
}).get("/", function (req, res) {
    Author.find(function (error, author) {
        if (error) {
            return res.send(error);
        }
        res.json(author);
    });
}).get('/:author_id', (req, res) => {
    Author.findById(req.params.author_id, (err, author) => {
        if (err) {
            return res.send(err);
        }
        res.json(author);
    });
}).put('/:author_id', (req, res) => {
    Author.findById((req.params.author_id), (err, author) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            author.name = req.body.name;
        }
        author.update_date = new Date();
        author.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap author"
            })
        });
    })
}).delete("/:author_id", (req, res) => {
    Author.remove({ _id: req.params.author_id }, (err, author) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong author"
        })
    });
});

module.exports = router;