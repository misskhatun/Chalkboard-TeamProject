const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const localstrategy = require('passport-local').Strategy;

const Person = require("./database.js").PersonModel;
const Course = require("./database.js").CourseModel;
const Search = require("./database.js").SearchModel;
app.use(express.static(__dirname + '/public'));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
 
  secret: "whydoesthiswork",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Person.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new localstrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done) {
  Person.findOne({ email: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Account does not exist.' });
    const usertype = req.body.accounttype;
    console.log("user:", user, "usertype:", usertype);
    if (usertype != user.accounttype) {
      return done(null, false, { message: "Wrong account type." })
    };
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return done(err);
      if (res === false) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  });
}));

app.get('/', loggedin, (req, res) => {
  if (req.user.accounttype == "Admin") res.redirect('/adminpage')
  else res.render('index.ejs', { accounttype: req.user.accounttype });
  
})

// app.get('/', loggedin, (req, res) => {
//   if (req.user.accounttype == "Student"){
//     Course.find({}, function(err,courses){
//       res.render('views/index.ejs',{
//         courselist:courses
//       })
//     })
//   }
//   else res.render('index.ejs', { accounttype: req.user.accounttype });
  
// })

const adminrouter = require('./routes/adminpage')
app.use('/', adminrouter)

app.get('/searchresults', loggedin, async (req, res) => {
  Course.find({ coursename: { $regex: '.*' + req.query.search + '.*' } }, (err, data) => {
    const newsave = new Search({
      searchterm: req.query.search,
      searchresult: data
    })
    newsave.save((err, data) => {
      if (err) return console.log(err);
    });
    res.render('searchresults.ejs', { data, search: req.query.search });
  })
})

app.get('/login', loggedout, (req, res) => {
  res.render('login.ejs');
})
app.get('/class111', loggedin, (req, res) => {
  res.render('cs111.ejs');
})
app.get('/class211', loggedin, (req, res) => {
  res.render('cs211.ejs');
})

app.get('/math141', loggedin, (req, res) => {
  res.render('math141.ejs');
})
app.get('/math142', loggedin, (req, res) => {
  res.render('math142.ejs');
})
app.get('/class', loggedin, (req, res) => {
  res.render('class.ejs');
})
app.get('/submission', loggedin, (req, res) => {
  res.render('submission.ejs');
})
app.get('/signup', loggedout, (req, res) => {
  res.render('signup.ejs');
})





// app.get('/',loggedin, (req,res) =>{
//   Course.find({}, function(err, course){
//     res.render('index.ejs',{
//       courselist: course
//     })
//   })
// })

const instructorrouter = require('./routes/instructor')
const instructorpostsrouter = require('./routes/instructorposts')
const editcourserouter = require('./routes/editcourseroute')
// const studentrouter = require('./routes/studentpage')
// app.use('/', studentrouter)
app.use('/', instructorrouter)
app.use('/', instructorpostsrouter)
app.use('/', editcourserouter)


app.post('/signup', loggedout, async (req, res) => {
  const exists = await Person.exists({ email: req.body.email });
  if (exists) {
    return res.send('This email is already in use.');
  };
  try {
    const hashedpw = await bcrypt.hash(req.body.password, 10);
    const newuser = new Person({
      fname: req.body.firstname,
      lname: req.body.lastname,
      email: req.body.email,
      password: hashedpw,
      accounttype: req.body.accounttype
    });
    newuser.save((err, data) => {
      if (err) return console.log(err);
      console.log(newuser.fname + " saved to database");
      console.log(data)
    });
    res.redirect('/login');
  } catch {
    res.redirect('/signup');
  }
})

app.post('/login', loggedout, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function loggedout(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next();
}

app.get('grading', (req,res)=>{
  res.render('views/grading.ejs')
})

console.log("Connected to DB");
app.listen(3002);
