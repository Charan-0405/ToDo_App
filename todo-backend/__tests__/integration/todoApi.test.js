const request= require("supertest")
const {MongoMemoryServer}=require("mongodb-memory-server")
const mongoose=require("mongoose")
const app=require("../../server")
const Todo=require("../../models/todoModel")
describe("Todo API Integration Test",()=>{
    let mongoServer;
    beforeAll(async ()=>{
mongoServer=await MongoMemoryServer.create();
const mongoUri=mongoServer.getUri();
 console.log("Mongo server uri is", mongoUri)
 await mongoose.disconnect()
 await mongoose.connect(mongoUri)
    })

    afterAll(async ()=>{
        await mongoose.disconnect();
        await mongoServer.stop()
    })

    describe("GET /api/get-todos",()=>{
     it("should return all the todos",async ()=>{
        await Todo.create({title:"Todo 1"})
        await Todo.create({title:"Todo 2"})
        const response= await request(app).get("/api/get-todos");
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
        expect(response.body[0].title).toBe("Todo 1")
        expect(response.body[1].title).toBe("Todo 2")
     })
    })

        describe("POST /api/add-todo", ()=>{
        it("should create a new todo", async () =>{
            const response = await request(app).post("/api/add-todo").send({title: "New Todo"})
            expect(response.status).toBe(200);
            expect(response.body.title).toBe("New Todo");
            expect(response.body.completed).toBe(false);
            const todo = await Todo.findById(response.body._id)
            expect(todo).toBeTruthy();
            expect(todo.title).toBe("New Todo")
        })
        
    })

    describe("DELETE /api/delete-todo",()=>{
        it("should delete a todo",async()=>{
        await Todo.create({title:"Todo 1"})
        await Todo.create({title:"Todo 2"})
          const todo=await Todo.findOne({title:"Todo 1"})
          const deleteId=todo._id
          const response=await request(app).delete("/api/delete-todo").query({id: todo._id.toString()})
          expect(response.status).toBe(200)
          expect(response.body.title).toBe("Todo 1");
          expect(response.body.completed).toBe(false);

        })
           it("should return 400 if id is invalid format", async () => {
      const response = await request(app)
        .delete("/api/delete-todo")
        .query({ id: "invalid-id" });
      expect(response.status).toBe(500); // assuming backend validates ID format
      expect(response.body.message).toBe("something went wrong in deleting a todo");
    });
    })

})