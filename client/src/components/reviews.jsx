import React, { useEffect, useState } from "react";
import Star from "./star";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Reviews = () => {
  const { user } = useAuth();
  const [reviewData, setReviewData] = useState([]);
  const [breweryData, setBreweryData] = useState([]);

  const getReviews = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/review/createreview",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const sData = await response.json();
      if (response.ok) {
        const userReviews = sData.message.filter(
          (review) => review.user_id === user._id
        );
        setReviewData(userReviews);

        // Extract brewery IDs and fetch their data
        const breweryIds = userReviews
          .map((review) => review.bewery_id)
          .join(",");
        if (breweryIds) {
          await getBreweryData(breweryIds);
          // console.log(breweryIds)
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reviews");
    }
  };

  const getBreweryData = async (breweryIds) => {
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_ids=${breweryIds}`
      );
      const breweries = await response.json();
      console.log(breweries)
      // console.log(breweriesData)
      setBreweryData(breweries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getReviews();
    }
  }, [user]);

console.log(reviewData);

  return (
    <><div className="main_review">
      {breweryData.map((review) => (
        <div key={review.id} className="reviews">
          <div className="reviews_container">
            <div className="reviews_body">
              <span className="reviews_sec">
                <span className="reviews_heading">Name: </span>
                {review ? review.name : "Loading..."}
              </span><br />
              <span className="reviews_sec">
                <span className="reviews_heading">Type: </span>
                {review ? review.brewery_type : "Loading..."}
              </span><br />
              <span className="reviews_sec">
                <span className="reviews_heading">Address: </span>
                {review ? review.street : "Loading..."}
              </span><br />
              <span className="reviews_sec">
                <span className="reviews_heading">Phone No: </span>
                {review ? review.phone : "Loading..."}
              </span>
              <br />
              <span className="reviews_sec">
                <span className="reviews_heading">Website: </span>
                {review ? (
                  <a href={review.website_url}>
                    {review.website_url}
                  </a>
                ) : (
                  "Loading..."
                )}
              </span>{reviewData.map((val)=>{
                if(val.bewery_id === review.id){
                return (
                  <div className="revs" key={val._id}>
                    <span className="reviews_heading">Your Review: </span>
                    <span> {val.review}</span>
                    <div className="revs_star">
                      <span className="reviews_heading">Your Reating </span>
                      <div className="main_star">
                        <Star num={5} act={val.star}/>
                      </div>
                    </div>
                  </div>
                );}
              })}
              
            </div>
          </div>
        </div>
      ))}
        </div>
    </>
  );
};

export default Reviews;
