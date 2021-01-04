import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../_actions/user_action";

const ContentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

function CheckPage(props) {
  const dispatch = useDispatch();
  const [radio, setRadio] = useState("");
  const onChageRadio = (e) => {
    setRadio(e.target.value);
  };
  const user = useSelector((state) => state.user);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      check: radio,
      name: user.userData.name,
      role: user.userData.role,
      date: Date.now(),
    };
    console.log(body);
    dispatch(check(body)).then((response) => {
      if (response.payload.checkSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };
  return (
    <>
      <ContentBox>
        <form onSubmit={onSubmitHandler}>
          <input
            type="radio"
            name="check"
            id="radio1"
            value="radio1"
            onChange={onChageRadio}
          />
          <label htmlFor="radio1">radio1</label>
          <input
            type="radio"
            name="check"
            id="radio2"
            value="radio2"
            onChange={onChageRadio}
          />
          <label htmlFor="radio2">radio2</label>
          <button>submit</button>
        </form>
      </ContentBox>
    </>
  );
}

export default CheckPage;
