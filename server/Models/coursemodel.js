//Model designing, how to inser the dat into db

const mongoose= require('mongoose');

const CourseSchema= new mongoose.Schema({       //collections we need to store or defination of your collection
    coursecode: String,                         //field: data type
    courseNumber: String,
    year: Number
});

module.exports= mongoose.model('courseSchema',CourseSchema);
