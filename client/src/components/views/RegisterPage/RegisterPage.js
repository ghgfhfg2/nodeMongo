import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../_actions/user_action";
import { withRouter } from 'react-router-dom';
import styled from "styled-components"

const PW_CONFIRM = styled.span`
  display:${props => props.pw === props.pw2 ? 'none' : 'block'};
  font-size:12px;
`


function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Name, setName] = useState("");
  const [passWord, setPassword] = useState("");
  const [passWord2, setPassword2] = useState("");

  const idReg = /^[A-za-z]{4,6}/g;

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
    
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onPasswordHandler2 = (e) => {
    setPassword2(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      id: Id,
      name: Name,
      password: passWord,
    };

    if(!idReg.test(Id) || Id === ""){
      alert('아이디를 확인해주세요')
      return
    }
    
    if(passWord != passWord2 || !passWord || !passWord2){
      alert('비밀번호를 확인해주세요')
      return
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
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Id</label>
        <input type="text" placeholder="영문,숫자조합 4~12자리" value={Id} onChange={onIdHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>password</label>
        <input type="password" value={passWord} onChange={onPasswordHandler} />
        <label>password confirm</label>        
        <input
          type="password"
          value={passWord2}
          onChange={onPasswordHandler2}
        />
        <PW_CONFIRM pw={passWord} pw2={passWord2}>
        <span>비밀번호가 일치하지 않습니다</span>
        </PW_CONFIRM>
        <br />
        <button type="submit">confirm</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
