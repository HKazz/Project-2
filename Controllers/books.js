const router = require("express").Router()
const Book = require('../models/books')

router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({creator: req.session.user._id})
        res.render('books/index.ejs', {user: req.session.user, Book: books})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router