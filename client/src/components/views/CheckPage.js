import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../_actions/user_action";
import axios from "axios";
import { getFormatDate } from "./Func";
import Loading from "./Loading";
import * as antIcon from "@ant-design/icons";

export const ContentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 15px;
`;
export const BasicInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  padding: 0 10px;
`;
export const BasicBtn = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #91d081;
  border-radius: 5px;
  background: #91d081;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
`;

const currentDate = getFormatDate(new Date());
const dbDate = Number(currentDate.split("|")[0]);
const dbDay = currentDate.split("|")[1];
function CheckPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [radio, setRadio] = useState("");
  const onChageRadio = (e) => {
    setRadio(e.target.value);
  };

  const [Comment, setComment] = useState("");
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const [Checked, setChecked] = useState("");

  useEffect(() => {
    if (user.userData) {
      axios.post("/api/users/checkData", user.userData).then((res) => {
        if (res.data.dataCheck && res.data.data) {
          const checkedDate = res.data.data.date;
          if (dbDate == checkedDate) {
            setChecked("check");
          } else {
            setChecked("none");
          }
        } else {
          setChecked("none");
        }
      });
    }
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      check: radio,
      name: user.userData.name,
      id: user.userData.id,
      role: user.userData.role,
      date: dbDate,
      day: dbDay,
      comment: Comment,
    };
    dispatch(check(body)).then((res) => {});
    axios.post("/api/users/lastCheck", body).then((res) => console.log(res));
  };
  if (Checked === "none") {
    return (
      <>
        <ContentBox>
          <form onSubmit={onSubmitHandler}>
            <div className="radio-flex-box">
              <input
                className="customRadio hidden"
                type="radio"
                name="check"
                id="radio1"
                value="radio1"
                onChange={onChageRadio}
              />
              <label className="basic-lunch" htmlFor="radio1">
                <i className="ic-basic-lunch"></i>일반식
              </label>
              <input
                className="customRadio hidden"
                type="radio"
                name="check"
                id="radio2"
                value="radio2"
                onChange={onChageRadio}
              />
              <label htmlFor="radio2" style={{ marginRight: "0px" }}>
                <i className="ic-diet-lunch"></i>다&nbsp;&nbsp;식
              </label>
              <div className="radio-bot-box">
                <BasicInput
                  style={{ width: "100%" }}
                  value={Comment}
                  placeholder="기타"
                  onChange={onChangeComment}
                />
                <BasicBtn style={{ marginTop: "10px" }}>체크하기</BasicBtn>
              </div>
            </div>
          </form>
        </ContentBox>
      </>
    );
  } else if (Checked === "check") {
    return (
      <>
        <ContentBox className="center-box">
          <span className="ic-check">
            <antIcon.CheckOutlined /> 식단체크 참여 완료
          </span>
        </ContentBox>
      </>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
}

export default CheckPage;
