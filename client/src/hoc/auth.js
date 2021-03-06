import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      const path = window.location.pathname;
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            alert('로그인이 필요합니다.')
            props.history.push("/login");
          }
          //로그인 하지 않은 상태
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
            return;
          } else {
            if (!option) {
              if (path === "/login") {
                alert("이미 로그인 한 상태 입니다.");
                props.history.push("/");
              }
            }
          }
          //로그인 한 상태
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
