const {Schema, model} = require("mongoose");


const createReview = new Schema({
    user_id:{type:String,required:true},
    bewery_id:{type:String,required:true},
    review:{type:String,required:true},
    star:{type:Number,required:true},
});

const Review = new model("Review", createReview);

module.exports=Review;