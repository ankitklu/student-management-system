const express= require('express');
const router= express.Router();
const studentprofile= require('../Models/studentprofile');

async function getStudentProfile(req, res,next){
    let student;
    try{
        student = await studentprofile.findById(req.params.id);
        if(student==null){
            return res.status(404).json({message: 'cant find studnets profile'});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
    res.student=student;
    next();

}

//to get all the student data to get the student's data
router.get('/',async (req,res)=>{
    try{
        const student= await studentprofile.find();
        res.json(student);
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
})

//to post new student's data
router.post('/',async (req,res)=>{
    try{
        const student= new studentprofile(req.body);
        await student.save();
        res.status(200).json(student);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}) 

//fetch the data by id
router.get('/:id',getStudentProfile, (req, res)=>{
    res.json((res.student));
});

//update operation by searching id no
router.put('/:id',getStudentProfile,async(req,res)=>{
    if(req.body.name!=null){
        res.student.name= req.body.name;
    }
    if(req.body.subject!=null){
        res.subject.name= req.body.subject;
    }
    if(req.body.age != null){
        res.student.age = req.body.age;
    }
    try{
        const updateddata=await res.student.save();
        res.json(updateddata);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//To delete student data by searching ID number
router.delete('/:id',getStudentProfile,async(req,res)=>{
    try{
        await res.student.deleteOne();
        res.json({msg: 'Student data is deleted'});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports= router;