const Todo= require("./models/todoModel")
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const dotenv=require("dotenv")
const {connect_db}=require("./db")
const todoRoutes= require("./routes/todoRoutes");
const app=express();
dotenv.config();
const PORT=3001;
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
try{
connect_db();
}
catch(err){
    console.log("error in conntect db",err);
}
app.use("/api",todoRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });