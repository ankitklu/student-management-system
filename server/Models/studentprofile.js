const mongoose= require('mongoose');
const studentprofileschema= new mongoose.Schema({
    name: String,
    subject: String,
    age: Number
});
module.exports= mongoose.model('studentprofile',studentprofileschema);