import React from "react";
import { IMAGE_URLs } from '../../services/constants'
const Thumbnails = ({index}) => {
  return (
    <div className="thumbnail-wrapper">
      <div className="thumnail-container">
        {IMAGE_URLs.map((url, idx) => (
          <div
            key={idx}
            className={`image-thumbnail ${idx === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url(https://picsum.photos/200/200/?blur&random=${idx})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Thumbnails;
