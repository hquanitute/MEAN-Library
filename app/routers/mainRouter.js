const bookRouter = require('./bookRouter');
const bookLocationRouter = require('./bookLocationRouter');
const categoryRouter = require('./categoryRouter');
const bookDetailRouter = require('./book_detailRouter')
const languageRouter = require('./languageRouter');
const publisherRouter = require('./publisherRouter');
const authorRouter = require('./authorRouter');
const borrowingCardRouter = require('./borrowingRouter');
const penalizeRouter = require('./penalizeRouter');
const userRouter = require('./userRouter');
const profileRouter = require('./profileRouter');
const resetpassword = require('./resetpassword');

const express = require('express');
var router = express.Router();
router.use('/books',bookRouter);
router.use('/booklocations',bookLocationRouter);
router.use('/categories',categoryRouter);
router.use('/bookDetails',bookDetailRouter);
router.use('/languages',languageRouter);
router.use('/publishers',publisherRouter);
router.use('/authors',authorRouter);
router.use('/borrowings',borrowingCardRouter);
router.use('/penalize',penalizeRouter);
router.use('/users',userRouter);
router.use('/profiles',profileRouter);
router.use('/resetpassword',resetpassword);
module.exports = router;