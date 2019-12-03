const express = require('express');
const Publisher = require('./../models/publisher');
var router = express.Router();
const option = require('./../middlewares/queryOption')

router.post("/", (req, res) => {
    let publisher = new Publisher();
    publisher.name = req.body.name;
    publisher.note = req.body.note;
    Publisher.create(publisher).then((publisher,err)=>{
        if (err) {
            return res.json({
                success: false,
                message: "Khong them publisher duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them publisher thanh cong"
        });
    })
}).get("/", option(),function (req, res) {
    Publisher.find({},{},req.option,function (error, publisher) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":publisher});
    });
}).get('/:publisher_id', (req, res) => {
    Publisher.findById(req.params.publisher_id, (err, publisher) => {
        if (err) {
            return res.send(err);
        }
        res.json(publisher);
    });
}).put('/:publisher_id', (req, res) => {
    Publisher.findById((req.params.publisher_id), (err, publisher) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            publisher.name = req.body.name;
        }
        if (req.body.note) {
            publisher.note = req.body.note;
        }
        publisher.update_date = new Date();
        publisher.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap publisher"
            })
        });
    })
}).delete("/:publisher_id", (req, res) => {
    Publisher.remove({ _id: req.params.publisher_id }, (err, publisher) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong publisher"
        })
    });
});

module.exports = router;