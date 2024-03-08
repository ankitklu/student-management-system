const express= require('express');   //express server
const Faculty= require('../Models/faculty');     //.. -> means outside the directory
const faculty = require('../Models/faculty');
const router= express.Router();

router.post("/",async(req,res)=>{
    try{
        console.log("inside the post")
        const faculty= new Faculty(req.body);
        await faculty.save();
        res.status(201).json(faculty);      //200 and plus  is status of success
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

router.get("/", async(req, res)=>{
    try{
        console.log("Inside get");
        const faculties= await Faculty.find();
        res.json(faculties);

    } 
    catch(error){
        res.status(500).json({message: error.message});
    }
})

//fetch specific faculty data based on id

async function getFaculty(req, res, next){
    let faculty;
    try{
        faculty = await Faculty.findById(req.params.id)
        if(faculty==null){
            return res.status(404).json({message: "Cannot find faculty"})
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
    res.faculty = faculty;
    next();
}

//function to delete faculty
router.delete("/:id",getFaculty,async(req,res)=>{
    try{
        const id = req.params.id;
        await Faculty.deleteOne({_id:id})
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

router.patch("/:id",getFaculty, async(req, res)=>{
    try{
        await Faculty.findById(req.params.id);
        faculty.designation= req.body.designation;
        faculty.qualification= req.body.qualification;
        faculty.email = req.body.email;
        const newfaculty = await faculty.save();
        res.status(201).json(newfaculty);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

module.exports = router;