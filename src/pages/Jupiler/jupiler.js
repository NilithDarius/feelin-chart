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
    console.log(token, "this is token");
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
    console.log(emotionData);
  }, []);
  return (
    <div>
      <div className="charts-wrapper">
        <EmotionChart />
      </div>
      <div className="charts-wrapper">
        <AttentionChart />
      </div>
    </div>
  );
}
export default Jupiler;
