const router = require("express").Router()
const Lists = require('../models/lists')

router.get('/', async (req,res)=>{ 
    try {
        const lists = await Lists.find({ creator: req.session.user._id })
        res.render('lists/index', { lists, user: req.session.user })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', (req,res)=>{
    try {
        res.render('lists/new.ejs', {user: req.session.user})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req,res)=>{
    try {
        req.body.creator = req.session.user._id
        const createdList = await Lists.create(req.body)
        res.redirect('/lists')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:listName', (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router