import React, { useState } from "react";
import "./style.css";
const Select = ({ title, data, type, changeSelect }) => {
  const chageData = (e) => {
    changeSelect({type: type, value: e.target.value})
  }
  return (
    <div className="custom-select">
      <label className="append-label">{title}</label>
      <select onChange={chageData}>
        {data.map((item, idx) => (
          <option key={idx} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
