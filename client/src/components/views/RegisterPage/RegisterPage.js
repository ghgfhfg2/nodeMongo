import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const PW_CONFIRM = styled.span`
  display: ${(props) => (props.pw === props.pw2 ? "none" : "block")};
  font-size: 12px;
`;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const idReg = /^[A-za-z]{4,6}/g;
  const [Id, setId] = useState("");
  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const [Name, setName] = useState("");
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const [passWord, setPassword] = useState("");
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const [passWord2, setPassword2] = useState("");
  const onPasswordHandler2 = (e) => {
    setPassword2(e.currentTarget.value);
  };

  const [Part, setPart] = useState("");
  const onPartHandler = (e) => {
    setPart(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      id: Id,
      name: Name,
      password: passWord,
      part: Part,
    };

    if (!idReg.test(Id) || Id === "") {
      alert("아이디를 확인해주세요");
      return;
    }

    if (passWord != passWord2 || !passWord || !passWord2) {
      alert("비밀번호를 확인해주세요");
      return;
    }

    dispatch(joinUser(body)).then((response) => {
      if (response.payload.joinSuccess) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
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
      <form
        autoComplete="off"
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>아이디</label>
        <input
          type="text"
          placeholder="영문,숫자조합 4~12자리"
          value={Id}
          onChange={onIdHandler}
        />
        <label>이름(실명)</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>부서</label>
        <select value={Part} onChange={onPartHandler}>
          <option value="none">선택해주세요</option>
          <option value="R&D">R&D</option>
          <option value="전략기획부">전략기획부</option>
          <option value="영업지원부">영업지원부</option>
          <option value="인사재경부">인사재경부</option>
          <option value="IT개발부">IT개발부</option>
          <option value="푸드킹">푸드킹</option>
          <option value="물류부">물류부</option>
        </select>

        <label>비밀번호</label>
        <input type="password" value={passWord} onChange={onPasswordHandler} />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={passWord2}
          onChange={onPasswordHandler2}
        />
        <PW_CONFIRM pw={passWord} pw2={passWord2}>
          <span>비밀번호가 일치하지 않습니다</span>
        </PW_CONFIRM>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
