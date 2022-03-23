const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task : {
        type : String,
    },
    status: {
        type : Boolean,
    },
    date:{
        type: Date,
        default : Date.now
    },
    modified_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    priority: {
        type: Number
    }
})

module.exports = Task = mongoose.model('task',TaskSchema)