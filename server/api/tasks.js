const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const mongoose = require('mongoose')
const Task = require('../../models/Task')
const User = require('../../models/User')
var ObjectId = require('mongodb').ObjectID;
const auth = require('../../middleware/auth')


//Create Task
router.post("/",auth, async(req,res) => { 
    
    const {task,status,date } = req.body
    try{
        // Check if the given userId is valid
        if(mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.log(req.user.id)
            // const subs = await User.findOne(new ObjectId(userId))

            const subs = await User.findById(req.user.id) 
            // If Id is valid create installment
            if(subs){
                new_task = new Task({
                    task,
                    status,
                    date,
                    user:req.user.id
                })
                await new_task.save();
                res.json({new_task})
            
            // If UserId is not Valid return error
            }else{
                return res.status(400).json({msg:"No Profile for this user"})
            }
        // If UserId is not Valid return error
        }else{
            return res.status(400).json({msg:"No Profile for this user"})
        }
    }catch(err){
        console.log(err)
    }
})


//Delete Task
router.delete("/delete",auth, async(req,res) => { 
    
    const {task_id} = req.body
    try{
        // Check if the given userId is valid
        if(mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.log(req.user.id)
            // const subs = await User.findOne(new ObjectId(userId))

            const subs = await User.findById(req.user.id) 
            // If Id is valid create installment
            const tasks = await Task.findById(new ObjectId(task_id))
            if(tasks){
                    await Task.findByIdAndDelete(new ObjectId(task_id))
                    res.json('Task Deleted')
            }
            
            // If UserId is not Valid return error
            else{
                return res.status(400).json({msg:"No Task for this user"})
            }
        // If UserId is not Valid return error
        }else{
            return res.status(400).json({msg:"No Task for this user"})
        }
    }catch(err){
        console.log(err)
    }
})


//Update Task

router.put("/update",auth, async(req,res) => { 
    
    const {task_id, status} = req.body
    const taskFields = {}
    if(status) taskFields.status = !status 
    try{
        // Check if the given userId is valid
        if(mongoose.Types.ObjectId.isValid(req.user.id)) {
            console.log(req.user.id)
            // const subs = await User.findOne(new ObjectId(userId))

            const subs = await User.findById(req.user.id) 
            // If Id is valid create installment
            var tasks = await Task.findById(new ObjectId(task_id))
            if(tasks){
                    tasks.status = !tasks.status
                    // tasks = await Task.findOneAndUpdate({_id:{$eq:task_id}},{ $set: {status:!status}},{new:true})
                    await tasks.save()
                    res.json({tasks})
            }
            
            // If UserId is not Valid return error
            else{
                return res.status(400).json({msg:"No Task for this user"})
            }
        // If UserId is not Valid return error
        }else{
            return res.status(400).json({msg:"No Task for this user"})
        }
    }catch(err){
        console.log(err)
    }
})


//Get Task

router.get('/get',auth,async(req,res)=>{
    try{
        const tasks = await Task.find({user:{$eq:req.user.id}})
        if(tasks){
            res.json({tasks})
        }else{
            return res.status(400).json({msg:'No Task For This User'})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router