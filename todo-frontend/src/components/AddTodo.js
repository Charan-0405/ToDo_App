import React ,{useState} from 'react'
const AddTodo=()=>{
const [todo,setTodo]=useState("Add a task")
   const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
    const response=await fetch("http://localhost:3001/api/add-todo",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({todo})
    })
    console.log("added a task",todo)

     }
    catch(err){
        console.log("error in adding todo",err);
    }

    }
    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    )
}
export default AddTodo