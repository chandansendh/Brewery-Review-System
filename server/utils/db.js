const mongoose = require("mongoose");

const URT = process.env.MONGODB_URI;

const connectdb = async()=>{
    try{
        await mongoose.connect(URT);
    }catch(error){
        console.error("DB not connected",error);
        process.exit(0);
    }
}

module.exports=connectdb;