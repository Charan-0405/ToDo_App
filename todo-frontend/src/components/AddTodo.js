import React ,{useState} from 'react'
const AddTodo=({onAdd})=>{
const [todo,setTodo]=useState("Add a task")
   
const handleSubmit= async (e)=>{
    e.preventDefault()
    if(!todo) return ;
    onAdd(todo)
    setTodo("")
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