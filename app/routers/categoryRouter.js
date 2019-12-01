const express = require('express');
const Category = require('./../models/category');
var router = express.Router();
var checkAuth = require('./../middlewares/jwtCheck');

router.post("/", (req, res) => {
    const date = new Date();
    let category = new Category();
    category.name = req.body.name;
    category.total_book = 0;
    category.rank = req.body.rank;
    category.status = true;
    category.create_date = date;
    category.update_date = date;
    category.save((err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Khong them category duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them category thanh cong"
        });
    });
}).get("/", checkAuth(1),function (req, res) {
    Category.find(function (error, categorys) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":categorys});
    });
}).get('/:category_id', (req, res) => {
    Category.findById(req.params.category_id, (err, category) => {
        if (err) {
            return res.send(err);
        }
        res.json(category);
    });
}).put('/:category_id', (req, res) => {
    Category.findById((req.params.category_id), (err, category) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            category.name = req.body.name;
        }
        if (req.body.total_book) {
            category.total_book = req.body.total_book;
        }
        if (req.body.rank) {
            category.rank = req.body.rank;
        }
        if (req.body.status) {
            category.status = req.body.status;
        }
        category.update_date = new Date();
        category.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap category"
            })
        });
    })
}).delete("/:category_id", (req, res) => {
    Category.remove({ _id: req.params.category_id }, (err, category) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong category"
        })
    });
});

module.exports = router;