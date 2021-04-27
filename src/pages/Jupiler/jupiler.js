// import React, { useCallback, useEffect } from "react";
import React from "react";
// import axios from "axios";
import { ScrollableChart, ControlGroup } from "../../components";
import { COLOR_LIST } from "../../utils/constants";
import { fakeData } from "../../utils/constants";
// import { loginQuery, emotionQuery } from "../../utils/gqlQueries";

function Jupiler() {
  // const fetchEmotion = useCallback(async () => {
  // setIsLoading(true);
  // const data = await axios.post(process.env.REACT_APP_API_URL, {
  //   query: loginQuery,
  // });
  // const { token } = data.data.data.login;
  // const emotionData = await axios.post(
  //   process.env.REACT_APP_API_URL,
  //   {
  //     query: emotionQuery,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // const trialEmotionData =
  //   emotionData.data.data.clientProfile.orders.filter(
  //     (order) => order.orderName === "Wave_test"
  //   ).length > 0 &&
  //   emotionData.data.data.clientProfile.orders.filter(
  //     (order) => order.orderName === "Wave_test"
  //   )[0];
  // setIsLoading(false);
  // setEmotionData(trialEmotionData);
  // }, []);

  // useEffect(() => {
  //   fetchEmotion();
  // }, [fetchEmotion]);
  const changeControlData = () => {};
  return (
    <div>
      {/* {isLoading && "Loading..."} */}
      {/* {!isLoading && ( */}
      <React.Fragment>
        <div className="charts-wrapper">
          <label className="charts-title">Emotion level on time</label>
          <ControlGroup kind={"emotion"} controlData={''} changeControlData={() => changeControlData()}/>
          <ScrollableChart
            type={"line"}
            kind={"emotion"}
            resources={fakeData}
            colorList={COLOR_LIST(6)}
          />
        </div>
        <div className="charts-wrapper">
          <label className="charts-title">Attention level on time</label>
          {/* <ControlGroup kind={"attention"} /> */}
          <ScrollableChart
            type={"bar"}
            kind={"attention"}
            resources={fakeData}
            colorList={COLOR_LIST(6)}
          />
        </div>
      </React.Fragment>
      {/* )} */}
    </div>
  );
}
export default Jupiler;
