const router = require("express").Router();
const mongoose = require("mongoose")
const Lists = require("../models/lists");
const Books = require("../models/books")

router.get("/", async (req, res) => {
  try {
    const lists = await Lists.find({ creator: req.session.user._id });
    res.render("lists/index.ejs", { lists, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async(req, res) => {
  try {
    const list = await Lists.find({creator: req.session.user._id})
    res.render("lists/new.ejs", { user: req.session.user, list: list});
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.creator = req.session.user._id;
    const createdList = await Lists.create(req.body);
    res.redirect("/lists");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:listName", async (req, res) => {
  try {
    const foundList = await Lists.findOne({
      listName: req.params.listName,
    }).populate("books");
    console.log(foundList);
    const books = await Books.find({ creator: req.session.user._id })
    res.render("lists/selectedList.ejs", { list: foundList, books });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.post("/:listName/add-books", async (req,res)=>{
  try {
    const {bookIds} = req.body;
    console.log("req.body",req.body)
    const list = await Lists.findOne({listName: req.params.listName});
    console.log(req.params.listName)
    console.log(list)
    if(!Array.isArray(bookIds)){
      list.books.push(bookIds)
      await list.save()
      return res.redirect(`/lists/${req.params.listName}`)
    }
    bookIds.forEach(bookId =>{
      if(!list.books.includes(bookId)){
        list.books.push(bookId)
        
      }
    })

    await list.save()
    res.redirect(`/lists/${req.params.listName}`)

   } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get("/update/:listId", async (req, res) => {
  try {
    const selectedList = await Lists.findById(req.params.listId);
    console.log(selectedList);
    res.render("lists/update.ejs", { list: selectedList });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:listId", async (req, res) => {
  console.log("Update route");
  await Lists.findByIdAndUpdate(req.params.listId, req.body);
  res.redirect("/lists");
});

router.delete("/delete/:listId", async (req, res) => {
  try {
    await Lists.deleteOne({_id: req.params.listId});
    console.log("deleted");

    res.redirect("/lists");
  } catch (error) {
    console.log(error);
    res.redirect("/lists");
  }
});

router.delete('/delete-selected/:listId', async (req,res)=>{
  try {
    const {listId} = req.params
    let bookIds = req.body['bookIds[]']   

    console.log(req.body)

    if(!mongoose.Types.ObjectId.isValid(listId)){
      console.log('Invalid List ID')
    }

    const list = await Lists.findById(listId)
    const listName = list.listName
    console.log(listName)

    if(!list){
      console.log('List not found')
    }
    
    if (Array.isArray(bookIds)) {
      console.log('deleting process array');
      bookIds.forEach(bookId => {
        console.log(bookId);
        list.books.pull(bookId); // Remove each book ID from the list
      });
    } else if (bookIds) {
      // If only one bookId is sent as a string (not in an array)
      console.log('deleting process not array');
      list.books.pull(bookIds);
    }

    console.log(list.books)
    await list.save()
    console.log('Selected books removed successfully')
    res.redirect(`/lists/${listName}`)


  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
