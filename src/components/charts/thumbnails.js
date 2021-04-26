import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { DEFAULT_RATIO, MAX_COUNT } from "../../utils/constants";

const Thumbnails = ({ index, eleWidth, type }) => {
  const [containerWidth, setContainerWidth] = useState(null);
  const generateArray = () => {
    const data = [];
    for (let i = 0; i < MAX_COUNT; i++) data[i] = i;
    return data;
  };
  useEffect(() => {
    setContainerWidth(
      document.getElementById(`${type}ChartAreaWrapper`).clientWidth
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleWidth]);

  return (
    <div
      className="thumbnailContainer"
      id="thumbnailContainer"
      style={{ width: containerWidth, height: eleWidth * DEFAULT_RATIO * 1.5 }}
    >
      {generateArray().map((item, idx) => (
        <div
          className={classNames({ active: index === idx })}
          style={{
            width: idx === index ? eleWidth * 1.5 : eleWidth,
            height:
              idx === index
                ? eleWidth * 1.5 * DEFAULT_RATIO
                : eleWidth * DEFAULT_RATIO,
            backgroundImage: `url(https://picsum.photos/200/200/?blur&random=${idx})`,
          }}
        />
      ))}
    </div>
  );
};
export default Thumbnails;
