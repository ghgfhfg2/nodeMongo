import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../_actions/user_action";
import axios from "axios";

const ContentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

function CheckPage(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [radio, setRadio] = useState("");
  const onChageRadio = (e) => {
    setRadio(e.target.value);
  };

  //const checkData = useSelector((state) => state.user);
  /*
  const [Checked, setChecked] = useState(false);
  useEffect(() => {
    console.log(user);
    if (user.userData) {
      console.log(user.userData._id);
      axios.post("/api/users/checkData", user.userData).then((res) => {
        if (res.data.dataCheck) {
          console.log("체크함" + res.data);
          console.log(res.data);
          setChecked(true);
        } else {
          console.log("체크안함");
        }
      });
    }
  }, [user]);
  */
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      check: radio,
      name: user.userData.name,
      role: user.userData.role,
      date: Date.now(),
    };
    dispatch(check(body)).then((res) => {
      console.log(res);
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
