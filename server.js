// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")
const authController = require('./Controllers/auth')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const bookController = require('./Controllers/books')
const listController = require('./Controllers/list.route')


// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal
app.set('view engine', 'ejs')
app.use(express.static('public'))


// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB OMAR")})


app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );


  app.use(passUserToView)

// =======================
// 4. ROUTES
// =======================


app.get('/', (req,res)=>{
    // console.log(req.session.user)
    res.render('index.ejs', {user: req.session.user})
})

// app.get('/books', (req,res)=>{
//     res.render('books/index.ejs', {user: req.session.user})
// })

// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.use('/auth', authController)

app.use(isSignedIn)
app.use("/books",bookController)
app.use("/lists",listController)

app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
  