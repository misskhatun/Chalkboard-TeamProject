
const express = require('express')
const router = express.Router()
const Course = require("../database.js").CourseModel;
const Person = require("../database.js").PersonModel;
const Assignment = require("../database.js").AssignmentModel;
router.get('/createassignment', loggedin, instructorcheck, (req, res) => {
  res.render('createassignment.ejs');
})

router.get('/createcourse', loggedin, instructorcheck, (req, res) => {
  res.render('createcourse.ejs');
})

router.get('/editcourse', loggedin, instructorcheck, async (req, res) => {
  const data = await Course.find({ creator: req.user.id })
  res.render('editcourse.ejs', { data });
})

router.get('/gradelist', loggedin, instructorcheck, (req, res) => {
  res.render('gradelist.ejs');
})

router.get('/grading', loggedin, instructorcheck, (req, res) => {
  res.render('grading.ejs');
})

router.get('/acceptreject', loggedin, instructorcheck, (req, res) => {
  Person.find({}, function(err, students){
    res.render('acceptreject.ejs',{
      studentlist: students
      
    })
  })
})

router.get('/studentroster', loggedin, instructorcheck, async (req, res) => {
  const data = await Course.find({ creatorid: req.user.id });
  console.log(data)
  res.render('studentroster.ejs', { data });
})

router.get('/selectedcourse', loggedin, instructorcheck, (req, res) => {
  res.render('selectedcourse.ejs');
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function instructorcheck(req, res, next) {
  if (req.user.accounttype != "Instructor") return res.redirect('/')
  next();
}

module.exports = router
