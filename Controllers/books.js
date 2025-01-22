const router = require("express").Router()
const Books = require('../models/books')

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

module.exports = router