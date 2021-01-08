import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

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

    let body = {
      id: Id,
      password: passWord,
    };
    console.log(body);

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
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
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>password</label>
        <input type="password" value={passWord} onChange={onPasswordHandler} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
