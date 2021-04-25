import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { IMAGE_URLs, default_ratio } from "../../services/constants";
const Thumbnails = ({ index, eleWidth, type }) => {
  const [containerWidth, setContainerWidth] = useState("");
  useEffect(() => {
    setContainerWidth(
      document.getElementById(`${type}ChartAreaWrapper`).clientWidth
    );
    console.log(
      document.getElementById(`${type}ChartAreaWrapper`).style.width,
      `this is ${type} width`,
      document.getElementById(`${type}ChartAreaWrapper`).clientWidth
    );
  });
  return (
    <div
      className="thumbnailContainer"
      id="thumbnailContainer"
      style={{ width: containerWidth, height: eleWidth * default_ratio * 1.5 }}
    >
      {IMAGE_URLs.map((imageURL, idx) => (
        <div
          className={classNames({ active: index === idx })}

          style={{
            width: idx === index ? eleWidth * 1.5 : eleWidth,
            height:
              idx === index
                ? eleWidth * 1.5 * default_ratio
                : eleWidth * default_ratio,
            backgroundImage: `url(https://picsum.photos/200/200/?blur&random=${idx})`,
          }}
        ></div>
        // <div
        //   style={{
        //     height: "100px",
        //     width: "300px",
        //     backgroundColor: "rebeccapurple",
        //   }}
        // ></div>
      ))}
    </div>
  );
};
export default Thumbnails;
