const mongoose=require("mongoose")
exports.connect_db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully")
    }
    catch(error){
        console.log("not connetced")
        console.log(error)
    }

};