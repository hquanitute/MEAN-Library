const express = require('express');
const User = require('./../models/user');
var router = express.Router();
const option = require('./../middlewares/queryOption');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let salt = bcrypt.genSaltSync(10);

router.post("/", (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.status = req.body.status;
    user.gender = req.body.gender;
    user.role = req.body.role;
    user.phone = req.body.phone;
    user.email = req.body.email;
    User.create(user).then((user,err)=>{
        if (err) {
            return res.json({
                success: false,
                message: "Khong them user duoc"
            });
        }
        return res.json({
            success: true,
            message: "Them user thanh cong"
        });
    })
}).get("/", option(),function (req, res) {
    User.find({},{},req.option,function (error, user) {
        if (error) {
            return res.send(error);
        }
        res.json({"content":user});
    });
}).get('/:user_id', (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });
}).put('/:user_id', (req, res) => {
    User.findById((req.params.user_id), (err, user) => {
        if (err) {
            return err;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.status) {
            user.status = req.body.status;
        }
        if (req.body.gender) {
            user.gender = req.body.gender;
        }
        if (req.body.role) {
            user.role = req.body.role;
        }
        if (req.body.phone) {
            user.phone = req.body.phone;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.register_code) {
            user.register_code = req.body.register_code;
        }
        user.update_date = new Date();
        user.save((err,user) => {
            if (err) {
                return res.json({
                    success: false,
                    message:err
                })
            }
            if(user){
                return res.json({
                    success: true,
                    data: user
                })
            }
            return res.json({
                success: false,
                message:"Loi ko xac dinh"
            })
        });
    })
}).delete("/:user_id", (req, res) => {
    User.remove({ _id: req.params.user_id }, (err, user) => {
        if (err) {
            return res.send(err);
        }
        res.json({
            success: true,
            message: "Da xoa thanh cong user"
        })
    });
}).put("/updatepassword/:user_id",(req,res)=>{
    User.findById((req.params.user_id), (err, user) => {
        user.password=bcrypt.hashSync(req.body.password, salt)
        user.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json({
                success: true,
                message: "Da cap nhap user"
            })
        });
    })
});

module.exports = router;