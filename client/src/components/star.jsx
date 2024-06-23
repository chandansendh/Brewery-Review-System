import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ num, onData, act }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index);
    onData(index);
  };

  const handleHover = (index) => {
    setHover(index);
  };

  const handleLeave = () => {
    setHover(rating);
    // console.log("leave");
  };
  if(!act){
  return (
    <>
      {[...Array(num)].map((_, ind) => {
        ind += 1;
        return (
          <FaStar
            key={ind}
            className={ind <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(ind)}
            onMouseEnter={() => handleHover(ind)}
            onMouseLeave={handleLeave}
          />
        );
      })}
    </>
  );}else{
    return (
    <>
      {[...Array(num)].map((_, ind) => {
        ind += 1;
        return (
          <FaStar
            key={ind}
            className={ind <= act ? "active" : "inactive"}
          />
        );
      })}
    </>);
  }
};

 export default Star;