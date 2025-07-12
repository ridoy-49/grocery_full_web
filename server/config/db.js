import mongoose from "mongoose";

const connetDb=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/grocery`).then(console.log("Database Connected"))
    }catch(error){
        console.error(error.message);
    }
}

export default connetDb;