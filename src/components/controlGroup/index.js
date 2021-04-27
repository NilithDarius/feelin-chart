import React, { useState } from "react";
import { DEFAULT_FORM_DATA, EMOTION_TYPE } from "../../utils/constants";
import { Select } from "../charts/select";
const ControlGroup = ({ kind, changeControlData }) => {
  const [controlData, setControlData] = useState({});
  const changeSelect = ({ value, type }) => {
    setControlData({
      data: {
        age: type === "age" ? value : controlData.age,
        gender: type === "gender" ? value : controlData.gender,
        emotion: type === "emotion" ? value : controlData.emotion,
      },
    });
    console.log(controlData, value, type, "select change data");
  };
  return (
    <div className="form-group">
      <div className="customized-select-group">
        <div className="age-select-manager">
          <Select
            title={"Age Segments"}
            data={DEFAULT_FORM_DATA.ageSegments}
            type="age"
            changeSelect={(data) => changeSelect(data)}
          />
        </div>
        <div className="gender-select-manager">
          <Select title={"Gender"} data={DEFAULT_FORM_DATA.gender} />
        </div>
        {kind === "emotion" && (
          <div className="emotion-select-manager">
            <Select title={"Emotion"} data={EMOTION_TYPE} />
          </div>
        )}

        <div className="legend-replica-wrapper">
          {kind === "emotion" && (
            <label>{`${DEFAULT_FORM_DATA.userCount} persons displayed`}</label>
          )}
          <div className="span-manager">
            <div>
              <span></span>
              <label>HAPPINESS</label>
            </div>
            <div>
              <span></span>
              <label>Sadness</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlGroup;
