import React from "react"
import { screen,render,fireEvent,cleanup } from "@testing-library/react"
import TodoItem from "../../components/TodoItem"

afterEach(()=>{
    cleanup();
    jest.resetAllMocks();
})
describe("Testing the TodoItem",()=>{
   const mockTodo = {_id:"1", title: "New Todo", completed: false}
   const mockDelete= jest.fn();
    test("check if the todo title gets rendered ",async()=>{
    render (< TodoItem todo={mockTodo}/>)
      expect(screen.getByText("New Todo")).toBeInTheDocument();
      
    })
    test("check if the onDelete method is invoked when clicked on delete button",()=>{
        render(<TodoItem todo={mockTodo} onDelete={mockDelete}/>)
        const button=screen.getByRole("button",{name:"Delete"})
        fireEvent.click(button)
        expect(mockDelete).toHaveBeenCalledWith(mockTodo)
    })

})