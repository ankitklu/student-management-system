const mongoose= require('mongoose');

const FacultySchema = new mongoose.Schema({
    faculty_id: Number,
    faculty_name: String,
    faculty_dept: String,
    qualification: String,
    designation: String,
    email: String,
    password: String
});

module.exports = mongoose.model("faculty",FacultySchema);