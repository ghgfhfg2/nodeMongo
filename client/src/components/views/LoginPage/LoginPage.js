import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { BasicBtn, BasicInput, ContentBox } from "../CheckPage";

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
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("아이디 혹은 비밀번호가 올바르지 않습니다.");
      }
    });
  };

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
      </form>
    </ContentBox>
  );
}

export default withRouter(LoginPage);
