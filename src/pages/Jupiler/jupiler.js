import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AttentionChart, EmotionChart } from "../../components";
import { loginQuery, emotionQuery } from "../../services/gqlQueries";
import "../../styles/charts.css";

function Jupiler() {
  const [emotionData, setEmotionData] = useState(0);

  useEffect(() => {
    fetchEmotion();
  }, []);

  const fetchEmotion = useCallback(async () => {
    const data = await axios.post(process.env.REACT_APP_API_URL, {
      query: loginQuery,
    });
    const { token } = data.data.data.login;
    const emotionData = await axios.post(
      process.env.REACT_APP_API_URL,
      {
        query: emotionQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const trialEmotionData =
      emotionData.data.data.clientProfile.orders.filter(
        (order) => order.orderName === "Wave_test"
      ).length > 0 &&
      emotionData.data.data.clientProfile.orders.filter(
        (order) => order.orderName === "Wave_test"
      )[0];
      setEmotionData(trialEmotionData);
  }, []);
  return (
    <div>
      <div className="charts-wrapper">
        <EmotionChart result={emotionData}/>
      </div>
      <div className="charts-wrapper">
        <AttentionChart />
      </div>
    </div>
  );
}
export default Jupiler;
