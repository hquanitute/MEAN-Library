const express = require('express');
const Penalize = require('./../models/penalize');
const Borrowing_card = require('./../models/borrowing-card-detail');
const User = require('./../models/user');
var router = express.Router();
var Q = require("q");

// router.get('/:user_id', (req, res) => {
//     var promise = new Promise(function (resolve, reject) {
//         let data = [];
//         let penalizes = [];
//         let borrowings = [];
//         let query1 = User.findById(req.params.user_id, (err, user) => {
//             if (err) {
//                 console.log("Not found user");
//                 return res.send(err);
//             }
//             user = user;
//         });
//         let query2 = Penalize.find({ user_id: req.params.user_id }, (err, penalize) => {
//             if (err) {
//             }
//             for (i = 0; i < penalize.length; i++) {
//                 penalizes[i] = penalize[i];
//             }
//         });
//         let query3 = Borrowing_card.find({ user_id: req.params.user_id }, (err, borrowing) => {
//             if (err) {
//             }
//             for (i = 0; i < borrowing.length; i++) {
//                 borrowings[i] = borrowing[i];
//             }
//             // console.log("1", borrowings);
//         })
//         let promise = Q.all(
//             query1.then(function (doc) {
//                 data.push({"user": doc})
//                 console.log("1")
//                 return data;
//             }),
//             query2.then(function (doc) {
//                 data.push({"penalize":doc})
//                 console.log("2")
//                 return data;
//             }),
//             query3.then(function (doc) {
//                 data.push({"borrowing_card": doc});
//                 // res.json(data);
//                 console.log("3")
//                 return data;
//             })
//         )
//         promise.then(promiseData =>{
//             return data;
//         })
//     }).then(data => res.json(data))
// })

router.get('/:user_id', (req, res) => {
    let data = [];
    let penalizes = [];
    let borrowings = [];
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            console.log("Not found user");
            return res.send(err);
        }
        return user;
    }).then(user => {
        data.push({ "user": user });
        Borrowing_card.find({ user_id: req.params.user_id }, (err, borrowing) => {
            if (err) {
            }
            for (i = 0; i < borrowing.length; i++) {
                borrowings[i] = borrowing[i];
            }
            return borrowings;
            // console.log("1", borrowings);
        }).then(borrowings => {
            data.push({ "borrowings": borrowings });
            Penalize.find({ user_id: req.params.user_id }, (err, penalize) => {
                if (err) {
                }
                for (i = 0; i < penalize.length; i++) {
                    penalizes[i] = penalize[i];
                }
                return penalizes;
            }).then(penalizes => { data.push({ "penalizes": penalizes }), res.json(data) });
        });
    });


})

module.exports = router;