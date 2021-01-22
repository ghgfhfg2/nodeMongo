import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { BasicBtn, BasicInput, ContentBox } from "../CheckPage";
import {useCookies} from 'react-cookie';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [passWord, setPassword] = useState("");

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!Id) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    if (!passWord) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    let body = {
      id: Id,
      password: passWord,
      isRemember: isRemember
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("아이디 혹은 비밀번호가 올바르지 않습니다.");
      }
    });
  };

  const [isRemember, setIsRemember] = useState(false);
  const [cookies] = useCookies(['rememberID','rememberPassword']);

  useEffect(() => {
      if(cookies.rememberID !== undefined) {
        setId(cookies.rememberID);
        setPassword(cookies.rememberPassword);
        setIsRemember(true);
      }
   }, []);
   const handleOnChange = (e) => {
    setIsRemember(!isRemember)
   }
 
  return (
    <ContentBox style={{ paddingTop: "50px" }}>
      <h2 className="sub-h2 center mb">로그인</h2>
      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <BasicInput
          type="text"
          placeholder="아이디"
          value={Id}
          onChange={onIdHandler}
          style={{ marginBottom: "10px", width: "100%", maxWidth: "400px" }}
        />
        <BasicInput
          placeholder="비밀번호"
          type="password"
          value={passWord}
          onChange={onPasswordHandler}
          style={{ marginBottom: "20px", width: "100%", maxWidth: "400px" }}
        />
        <BasicBtn type="submit" style={{ width: "100%", maxWidth: "400px" }}>
          login
        </BasicBtn>
        <div className="flex-box a-center" style={
          {
            width: "100%",
            maxWidth: "400px",
            paddingLeft: "5px",
            marginTop: "7px"
          }}>
          <input type="checkbox" style={{marginRight:"5px"}} id="remember" onChange={handleOnChange}
          checked={isRemember}
          />
          <label style={{fontSize:"12px"}} htmlFor="remember">
            아이디,패스워드 저장하기
          </label>  
        </div>
      </form>
    </ContentBox>
  );
}

export default withRouter(LoginPage);
