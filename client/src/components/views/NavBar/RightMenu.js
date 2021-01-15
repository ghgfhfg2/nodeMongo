import React from "react";
import { API_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    axios
      .get(`${API_SERVER}/api/users/logout`,{ withCredentials: true })
      .then((res) =>
        res.data.success
          ? props.history.push("/login")
          : alert("로그아웃에 실패헸습니다.")
      );
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <>
        <a href="/register" style={{ marginRight: "10px" }}>
          join
        </a>
        <a href="/login" style={{ marginRight: "10px" }}>
          login
        </a>
      </>
    );
  } else {
    if(user.userData && user.userData.isAdmin){
      return (
        <>
          <a href="/admin" style={{ marginRight: "10px" }}>
            admin
          </a>
          <a href="/" style={{ marginRight: "10px" }} onClick={onLogout}>
            logout
          </a>
        </>
      );
    }else{
      return (
        <>
          <a href="/" style={{ marginRight: "10px" }} onClick={onLogout}>
            logout
          </a>
        </>
      );
    }
  }
}

export default withRouter(RightMenu);
