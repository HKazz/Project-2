const router = require("express").Router()
const Books = require('../models/books')


// route no longer necessary....will remove later
// router.get('/', async (req,res)=>{ 
//     try {
//         const books = await Books.find({ creator: req.session.user._id })
//         res.render('books/index.ejs', { books, user: req.session.user })
//     } catch (error) {
//         console.log(error)
//         res.redirect('/')
//     }
// })


// replacement route
router.get('/', async (req,res)=>{ 
    try {
        const books = await Books.find({ creator: req.session.user._id })
        res.render('books/books.ejs', { books, user: req.session.user })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', (req,res)=>{
    res.render('books/new.ejs', {user: req.session.user})
})
router.post('/', async (req,res)=>{
    try {
        console.log(req.session.user)
        req.body.creator = req.session.user._id
        console.log(req.body)
        const createdBook = await Books.create(req.body)
        res.redirect('/books')
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Books.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.redirect('/books')
    } catch (error) {
        console.log(error);
        res.redirect('/books')
    }
})


module.exports = router