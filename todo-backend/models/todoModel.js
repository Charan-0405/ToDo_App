const mongoose =require('mongoose');
const todoSchema=({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
     type:Date,
     default:Date.now()
    },
    completedAt:{
        type:Date
    }

})
module.exports=mongoose.model('Todo',todoSchema)