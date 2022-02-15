
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mongo:jVooNwtFztcmAQTo@cluster0.ipmot.mongodb.net/chalkUser?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accounttype: { type: String, required: true },
  enrolledcourses: [Schema.Types.ObjectId]
});

let Person = mongoose.model('Person', personSchema);

const courseSchema = new Schema({
  coursename: { type: String, required: true },
  creatorid: { type: Schema.Types.ObjectId, required: true },
  creatorname: { type: String, required: true },
  instructors: [Schema.Types.ObjectId],
  coursedesc: { type: String, required: true },
  students: [Schema.Types.ObjectId],
  assignments: [Schema.Types.ObjectId]
});

let Course = mongoose.model('Course', courseSchema);

const assignmentSchema = new Schema({
  assignmentname: { type: String, required: true },
  assignmentdesc: { type: String, required: true },
  questions: [String],
  answers: [String],
  duedate: Date,
  courseid: { type: Schema.Types.ObjectId, required: true }
});

let Assignment = mongoose.model('Assignment', assignmentSchema);

const searchSchema = new Schema({
  searchterm: { type: String, required: true },
  searchresult: [String]
})

let Search = mongoose.model('Search', searchSchema);

exports.PersonModel = Person;
exports.CourseModel = Course;
exports.SearchModel = Search;
exports.AssignmentModel = Assignment;
