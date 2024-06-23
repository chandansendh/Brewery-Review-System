const Review = require("../Model/review-model");

const review = async(req,res)=>{
    try {
        const responce = req.body;
        console.log(responce);
        await Review.create(responce);
        return res.status(200).json({message:"Review saved"})
    } catch (error) {
        return res.status(500).json({message:"Review save faild"})
        
    }
};
const getReview=async(req,res)=>{
    try {
        const responce = req.body;
        const data = await Review.find();
        return res.status(200).json({message:data});
    } catch (error) {
        return res.status(500).json({ message: "No data found" });
    }
};

module.exports={review,getReview};