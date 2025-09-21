const workoutModel = require("../models/workoutModel");
const mongoose=require('mongoose')

// GET all worlkouts
exports.getWorkouts=async(req,res)=>{
    const user_id=req.user._id
    const workouts=await workoutModel.find({user_id}).sort({createdAt: -1})

    if(!workouts)
        return res.status(400).json({error:"No Entries Found"})

    res.status(200).json(workouts)
}

// GET a single workout by its id
exports.getWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid ID"})
    }

    const workout=await workoutModel.findById(id);

    if(!workout)
        return res.status(404).json({error:"No  such Workout"})

    return res.status(200).json(workout)
}

// Create a new workout
exports.createWorkout=async(req,res)=>{

    const {title,load,reps}=req.body;
    try{
        const user_id=req.user._id
        const workout=await workoutModel.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    res.json({
        msg:"Create/Add a new workout"
    })
}

// Delete a workout bt its id
exports.deleteWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid ID"})
    }

    const workout=await workoutModel.findByIdAndDelete(id)

    if(!workout){
        return res.status(400).json({error:"No such Workout"})
    }
    res.status(200).json(workout)

}

// Update a workout by its id
exports.updateWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid ID"})
    }

    const workout=await workoutModel.findByIdAndUpdate(
        {
            _id:id
        },
        {
            ...req.body
        },
        {
            new:true
        }
        )

    if(!workout){
        return res.status(400).json({error:"No such Workout"})
    }
    res.status(200).json(workout)
}