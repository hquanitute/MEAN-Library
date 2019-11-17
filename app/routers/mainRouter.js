const bookRouter = require('./bookRouter');
const bookLocationRouter = require('./bookLocationRouter');
const categoryRouter = require('./categoryRouter');
const bookDetailRouter = require('./book_detailRouter')
const languageRouter = require('./languageRouter');
const publisherRouter = require('./publisherRouter');
const authorRouter = require('./authorRouter');
const borrowingCardRouter = require('./borrowingRouter');

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
module.exports = router;