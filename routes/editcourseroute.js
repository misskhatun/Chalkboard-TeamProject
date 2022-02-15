
const express = require('express')
const router = express.Router()
const Person = require("../database.js").PersonModel;
const Course = require("../database.js").CourseModel;
const Assignment = require("../database.js").AssignmentModel;

router.post('/editcourse', loggedin, async (req, res) => {
  if (req.body.bttn == 'Delete') {
    const status = await Course.findByIdAndDelete(req.body.coursechoice);
    const statusasng = await Assignment.deleteMany({ courseid: req.body.coursechoice });
    const statususer = await Person.updateMany({}, { $pull: { enrolledcourses: req.body.coursechoice } });
    if (status && statusasng) res.redirect('/editcourse');
    else res.send("Something went wrong!")

  }
  else if (req.body.bttn == 'Edit') {
    res.redirect('/editcourse');
  }
});

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router
