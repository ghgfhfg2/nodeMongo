import React from "react";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    axios
      .get(`${USER_SERVER}/logout`)
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
          회원가입
        </a>
        <a href="/login" style={{ marginRight: "10px" }}>
          로그인
        </a>
      </>
    );
  } else {
    if(user.userData && user.userData.isAdmin){
      return (
        <>
          <a href="/admin" style={{ marginRight: "10px" }}>
            관리자
          </a>
          <a href="/" onClick={onLogout}>
            로그아웃
          </a>
        </>
      );
    }else{
      return (
        <>
          <a href="/" onClick={onLogout}>
          로그아웃
          </a>
        </>
      );
    }
  }
}

export default withRouter(RightMenu);
