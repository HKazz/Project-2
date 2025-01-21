const router = require("express").Router()
const Book = require('../models/books')

router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({creator: req.session.user._id})
        res.render('books/index.ejs', {user: req.session.user, Book: books})
=======
router.get('/new', (req,res)=>{
    res.render('books/new.ejs', {user: req.session.user})
})
router.post('/', async (req,res)=>{
    try {
        console.log(req.session.user)
        req.body.creator = req.session.user._id
        console.log(req.body)
        const createdBook = await Book.create(req.body)
        res.redirect('/books')

    } catch (error) {
        console.log(error)
    }
})