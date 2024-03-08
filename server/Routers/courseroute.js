const express= require('express');      //importing the library, to access Http response
const router= express.Router();             //to operate on end-points
const Courses= require('../Models/coursemodel');        //operations on MongoDb using node.js
const csvtojson= require('csvtojson');          //needs to be installed first
const multer= require('multer');                //needs to be installed first

//post
router.post('/',async(req,res)=>{
    try{
        const course= new Courses(req.body);        //body consistes of json data   instance of course model
        await course.save();            //whether chnages have happened
        res.status(200).json(course);       //whether post is completed, u need to give the status
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
});

//to get the details, or to get the stored info
//to get all the data
router.get('/',async(req,res)=>{
    try{
        const course= await Courses.find();     //find is to get all the details, it is inbuilt in mongoose
        res.json(course);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//finding out specific value 
//customize function
async function getCourses(req,res,next){
    let course;
    try{
        course= await Courses.findById(req.params.id);  //Courses is collection name, findById is default function in mongoose
        if(course==null){
            return res.status(404).json({message:"record not found"});
        }
    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
    res.course=course;
    next();         //if further record are there it would display it
}

router.get('/:id', getCourses, async(req, res)=>{
    res.json(res.course);
})

//updation of records
router.put('/:id', getCourses, async(req, res)=>{
    if(req.body.coursecode!=null){
        res.course.coursecode =req.body.coursecode;   //after = to sign is the data u inserted, the value will be updated
    }
    if(req.body.courseNumber!=null){
        res.course.courseNumber =req.body.courseNumber;   //after = to sign is the data u inserted, the value will be updated
    }
    if(req.body.year!=null){
        res.course.year =req.body.year;   //after = to sign is the data u inserted, the value will be updated
    }
    try{
        const updatedCourse= await res.course.save();     //save means the changes are made
        res.json(updatedCourse);
    }
    catch(error){ 
        res.status(400).json({message:error.message});
    }
})

//delete a record
router.delete('/:id', getCourses, async (req, res) => {
    try {
        await Courses.findByIdAndDelete(res.course._id);    //record will be deleted , if u ignore this line, the data will not be deleted from the database
        res.json({ message: "Course is deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


const storage= multer.memoryStorage();              //access the local files
const upload = multer({storage:storage.storage})   

router.post('/upload',upload.single('file'),async(req,res)=>{
    if(!req.file){
        return res.status(400).json('no file uploaded');
    }
    try{
        const jsonarray= await csvtojson().fromString(req.file.buffer.toString());
        await Courses.insertMany(jsonarray);        //mongoDB command to insert data on to db
        res.json({message: "CSV file uploaded successfully"});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
})

module.exports= router;