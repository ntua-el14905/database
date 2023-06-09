const express = require('express');
const booksController = require('../controllers/books');

const router = express.Router();

router.get('/', booksController.getBooks);
router.post('/add', booksController.postBook);
router.post('/update/:isbn', booksController.updateBook);

//user books
router.get('/users', booksController.getUserBooks);
router.post('/users/toReservation', booksController.addReservation);
//router.get('/mybooks', booksController.getmyBooks);
router.post('/users/submitreview/:isbn', booksController.submitReview);
router.get('/mybooks', booksController.getMyBooks);

module.exports = router;