const router = require("express").Router();
const Lists = require("../models/lists");

router.get("/", async (req, res) => {
  try {
    const lists = await Lists.find({ creator: req.session.user._id });
    res.render("lists/index.ejs", { lists, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  try {
    res.render("lists/new.ejs", { user: req.session.user });
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
    res.render("lists/selectedList.ejs", { list: foundList });
  } catch (error) {
    console.log(error);
  }
});

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

module.exports = router;
