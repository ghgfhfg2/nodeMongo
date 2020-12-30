import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [passWord, setPassword] = useState("");
  const [passWord2, setPassword2] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
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
      email: Email,
      name: Name,
      password: passWord,
    };

    dispatch(joinUser(body)).then((response) => {
      if (response.payload.joinSuccess) {
        console.log("성공");
        props.history.push("/");
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
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>password</label>
        <input type="password" value={passWord} onChange={onPasswordHandler} />
        <label>password confirm</label>
        <input
          type="password2"
          value={passWord2}
          onChange={onPasswordHandler2}
        />
        <br />
        <button type="submit">confirm</button>
      </form>
    </div>
  );
}

export default RegisterPage;
