const express = require("express");
const router = express.Router();
const {review,getReview} = require("../controllers/review-controllers");

router.route("/createreview").post(review).get(getReview);

module.exports=router;