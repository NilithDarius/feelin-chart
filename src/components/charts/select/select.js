import React from "react";
import "./style.css";
const Select = ({ title, data }) => {
  console.log("this is data", data);
  return (
    <div className="custom-select">
      <label className="append-label">{title}</label>
      <select>
        {data.map((item, idx) => (
          <option value={item.label}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
