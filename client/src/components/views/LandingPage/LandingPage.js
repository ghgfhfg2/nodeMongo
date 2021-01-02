import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
//import { response } from 'express';

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);

  const onLogout = () => {
    axios
      .get(`/api/users/logout`)
      .then((res) =>
        res.data.success
          ? props.history.push("/login")
          : alert("로그아웃에 실패헸습니다.")
      );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
