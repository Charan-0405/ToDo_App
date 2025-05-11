const Todo=require("../models/todoModel");
exports.getTodos=async (req,res)=>{
    try{
const todos=await Todo.find()
res.status(200).json(todos)
}
catch(error){
    console.log("error in fetching the todos",error)
   res.status(500).json({message: "something went wrong, please try later"})
}
}
exports.addTodo=async (req,res)=>{
    try{
    const title=req.body
    const newTodo= new Todo({
        title:title.todo
    })
    const savedTodo=await newTodo.save()
    res.status(200).json({message:"todo received"})
}
catch(error){
 res.status(500).json({message: "something went wrong, please try later"})
}
}