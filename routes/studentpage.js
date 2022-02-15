const express = require('express')
const router = express.Router()
const Person = require("../database.js").PersonModel;
const Course = require("../database.js").CourseModel;
const Assignment = require("../database.js").AssignmentModel;


router.post('/course/:id', loggedin, async (req, res) => {
    const userdata = await Person.find({});
  // const exists = await Course.exists({ coursename: req.body.coursename });
  // if (exists) {
  //   return res.send('This course name is already in use.');
  // };
  //TODO: Make sure the deleted course is deleted from all associated docs, like instructors and students and all the assignments too oh jesus that's a lot lol.
  if (req.body.enroll == 'Enroll') {
    // const params = {
    //     courseId: req.params.id
       
    // }
  

    // module.exports.enroll = (params) => {
    //     return Course.findById(params.enrolledcourses).then(userdata => {
    //         userdata.enrolledcourses.push({enrolledcourses: params.courseId})
    
    //         return userdata.save().then((userdata, error) => {
    //             return (error) ? false : true
    //         })
    //     })
    // }
    //const status = await Course.findById(req.body.enroll);
    // console.log("this is enrolled button "+status)
    // const statususer = await Person.updateMany({}, { $pull: { enrolledcourses: req.body.coursechoice } });
    // userdata.enrolledcourses.push();
   
    
  }
  // console.log(req)
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
