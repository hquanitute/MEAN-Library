const express = require('express');
const Penalize = require('./../models/penalize');
var router = express.Router();

router.post("/", (req, res) => {
    let penalize = new Penalize();
    penalize.reason = req.body.reason;
    penalize.user_id = req.body.user_id;
    penalize.editor_id = req.body.editor_id;
    penalize.save((err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Khong them penalize duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them penalize thanh cong"
        });
    });
}).get("/", function (req, res) {
    Penalize.find(function (error, penalize) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":penalize});
    });
}).get('/:penalize_id', (req, res) => {
    Penalize.findById(req.params.penalize_id, (err, penalize) => {
        if (err) {
            return res.send(err);
        }
        res.json(penalize);
    });
}).put('/:penalize_id', (req, res) => {
    Penalize.findById((req.params.penalize_id), (err, penalize) => {
        if (err) {
            return err;
        }
        if (req.body.reason) {
            penalize.reason = req.body.reason;
        }
        if (req.body.user_id) {
            penalize.user_id = req.body.user_id;
        }
        if (req.body.editor_id) {
            penalize.editor_id = req.body.editor_id;
        }
        penalize.update_date = new Date();
        penalize.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap penalize"
            })
        });
    })
}).delete("/:penalize_id", (req, res) => {
    Penalize.remove({ _id: req.params.penalize_id }, (err, penalize) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong penalize"
        })
    });
});

module.exports = router;