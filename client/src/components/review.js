import { useEffect, useState } from "react";
import Star from "./star";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";


const Review = ()=>{
    const [brewery, setBrewery]=useState({});
    const {id}= useParams();
    const [input, setInput]=useState("");
    const [star, setStar]=useState(0);
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchBrewery =async()=>{
        try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setBrewery(response.data);
      } catch (err) {
        toast.error("Failed to fetch breweries data");
        console.log("error");
      }};
      fetchBrewery();
    },[id]);
    console.log(brewery);
      console.log(id);
      console.log(user);

      const handleStars=(data)=>{
        setStar(data);
      }
      const handelInput=(e)=>{
        setInput(e.target.value);
        console.log(input);
      }
      const handelSubmit = async()=>{
        let data = {user_id:user._id,bewery_id:id,review:input,star:star};
        try {
            const responce = await fetch(
              "https://brewery-server.onrender.com/api/review/createreview",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }
            );
            const sData= await responce.json();
            toast.success(sData.message);
            if(responce.ok){
                navigate("/home")

            }else{
                toast.error("somthing wrong");
            }
        } catch (error) {
            console.log(error);
        }
      }
    return (
      <>
        <div className="review_contener">
          <div className="review_body">
            <div className="review">
              <span className="review_sec">
                <span className="review_heading">Name:</span> {brewery.name}
              </span>
              <span className="review_sec">
                <span className="review_heading">Type:</span>
                {brewery.brewery_type}
              </span>
            </div>
            <div className="review">
              <span className="review_sec">
                <span className="review_heading">Address:</span> {brewery.city},
                {brewery.state},{brewery.postal_code}
              </span>
            </div>
            <div className="review">
              <span className="review_sec">
                <span className="review_heading">Phone No:</span>
                {brewery.phone}
              </span>
              <br />
              <span className="review_sec">
                <span className="review_heading">Website:</span>
                <a href={brewery.website_url}>{brewery.website_url}</a>
              </span>
            </div>
            <div className="rev">
              <label>Give Your Review</label>
              <textarea
                className="review-text"
                onChange={handelInput}
              ></textarea>
              <div className="rev_star">
                <div>How much You rate?</div>
                <div className="main_star">
                  <Star num={5} onData={handleStars} />
                </div>
              </div>
              <button className="review_submit" onClick={handelSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default Review;
