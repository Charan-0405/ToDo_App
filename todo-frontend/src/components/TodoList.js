import React,{useState ,useEffect} from "react";
import BACKEND_URL from "../config/config";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
const TodoList=()=>{
    const [todos,setTodos]=useState([])
  
    useEffect(()=>{
        fetchTodos()
    },[])

    const fetchTodos = async ()=>{
        try{
            const response=await fetch(`${BACKEND_URL}/get-todos`)
            const data= await response.json()
            setTodos(data)
        }
        catch(error){
            console.log("Error in fetching todos",error)
        }
    }

    const addTodo =async(title)=>{
        console.log("Adding a todo",title)
        try{
            const response=await fetch(`${BACKEND_URL}/add-todo`,{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title})
            })
            console.log(response)
            const newTodo=await response.json()
            setTodos((prev)=> [...prev,newTodo])
        }
         catch (error) {
            console.error("Error while creating the todo", error)
    }
}

const deleteTodo=async (todo)=>{
    console.log("deleting a todo",todo)
    try{
        const id=todo._id
        const response=await fetch(`${BACKEND_URL}/delete-todo?id=${id}`,{
            method:'DELETE'
        })
        console.log("response in delete",response)
        if (response.status===200) {
            setTodos(prev => prev.filter(todo => todo._id !== id));
        } else {
            console.error("Failed to delete todo on backend");
        }
    }
    catch(error){
        console.log("Getting problem in deleting a todo",error)
    }

}
return (
     <div>
            <h1> Todo List </h1>
            <AddTodo onAdd= {addTodo} />
            <ul>
                {
                    todos.map( todo => (
                        <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo}></TodoItem>
                    ))
                }
            </ul>
        </div>
)

}
export default TodoList