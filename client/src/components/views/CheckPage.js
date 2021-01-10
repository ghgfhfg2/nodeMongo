import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../_actions/user_action";
import axios from "axios";
import { getFormatDate } from "./Func";
import Loading from "./Loading";
import * as antIcon from "@ant-design/icons";
import { Input } from "antd";

export const ContentBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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
              <label htmlFor="radio1">일반식</label>
              <input
                className="customRadio hidden"
                type="radio"
                name="check"
                id="radio2"
                value="radio2"
                onChange={onChageRadio}
              />
              <label htmlFor="radio2" style={{ marginRight: "0px" }}>
                다식
              </label>
              <div className="radio-bot-box">
                <Input
                  value={Comment}
                  placeholder="기타"
                  onChange={onChangeComment}
                />
                <button>submit</button>
              </div>
            </div>
          </form>
        </ContentBox>
      </>
    );
  } else if (Checked === "check") {
    return (
      <>
        <div className="center-box">
          <antIcon.CheckOutlined /> 식단체크 참여 완료
        </div>
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
