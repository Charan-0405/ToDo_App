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
    const title=req.body.title
    const newTodo= new Todo({
        title:title
    })
    const savedTodo=await newTodo.save()
    res.status(200).json(savedTodo)
}
catch(error){
 res.status(500).json({message: "something went wrong, please try later"})
}

}
exports.deleteTodo= async(req,res)=>{
    try{
   const id=req.query.id
   const respone=await Todo.findByIdAndDelete(id)
   res.status(200).json({message:"successfully deleted a todo"})

    }
    catch(error){
        console.log("getting error while deleting a todo",error)
        res.status(500).json({message:"something went wrong in deleting a todo"})
    }
}