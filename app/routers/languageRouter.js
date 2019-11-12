const express = require('express');
const Language = require('./../models/language');
var router = express.Router();

router.post("/", (req, res) => {
    let language = new Language();
    language.name = req.body.name;
    language.note = req.body.note;
    language.save((err) => {
        if (err) {
            return res.json({
                success: false,
                message: "Khong them language duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them language thanh cong"
        });
    });
}).get("/", function (req, res) {
    Language.find(function (error, language) {
        if (error) {
            return res.send(error);
        }
        res.json(language);
    });
}).get('/:language_id', (req, res) => {
    Language.findById(req.params.language_id, (err, language) => {
        if (err) {
            return res.send(err);
        }
        res.json(language);
    });
}).put('/:language_id', (req, res) => {
    Language.findById((req.params.language_id), (err, language) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            language.name = req.body.name;
        }
        if (req.body.note) {
            language.note = req.body.note;
        }
        language.update_date = new Date();
        language.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.json({
                success: true,
                message: "Da cap nhap language"
            })
        });
    })
}).delete("/:language_id", (req, res) => {
    Language.remove({ _id: req.params.language_id }, (err, language) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong language"
        })
    });
});

module.exports = router;