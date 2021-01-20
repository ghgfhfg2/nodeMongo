import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { check } from "../../_actions/user_action";
import axios from "axios";
import { getFormatDate } from "./Func";
import Loading from "./Loading";
import * as antIcon from "@ant-design/icons";
import { API_SERVER } from "../../Config"

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
  font-size:12px;
`;
export const BasicBtn = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #75bf61;
  border-radius: 5px;
  background: #75bf61;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  &.border {
    background: none;
    color: #75bf61;
    &.black {
      color: #111;
      border-color: #111;
    }
    &.gray {
      color: #888;
      border-color: #ddd;
    }
  }
`;

const currentDate = getFormatDate(new Date());
const dbDate = Number(currentDate.split("|")[0]);
const dbDay = currentDate.split("|")[1];
const dbTime = currentDate.split("|")[2];
function CheckPage(props) {
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
      axios.post(`${API_SERVER}/api/users/checkData`, user.userData).then((res) => {
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
    if (!radio) {
      alert("식단을 선택해 주세요.");
      return;
    }

    let body = {
      check: radio,
      name: user.userData.name,
      part: user.userData.part,
      id: user.userData.id,
      role: user.userData.role,
      date: dbDate,
      day: dbDay,
      time: dbTime,
      comment: Comment,
    };
    dispatch(check(body)).then((res) => {});
    axios.post(`${API_SERVER}/api/users/lastCheck`, body).then((res) => console.log(res));
  };

  
  const [GetLunchImg, setGetLunchImg] = useState()
  useEffect(() => {
    axios.get(`${API_SERVER}/api/users/getLunchImg`)
    .then(res => {
      setGetLunchImg(res.data.img.originalname)
    })
  }, [GetLunchImg])

  const [GetCheckhImg, setGetCheckhImg] = useState()
  useEffect(() => {
    axios.get(`${API_SERVER}/api/users/getCheckImg`)
    .then(res => {
      setGetCheckhImg(res.data.img.originalname)
    })
  }, [GetCheckhImg])

  const [CheckImg, setCheckImg] = useState(false)
  const onCheckImg = () => {
    setCheckImg(!CheckImg)
    setCheckImg2(false)
  }
  const [CheckImg2, setCheckImg2] = useState(false)
  const onCheckImg2 = () => {
    setCheckImg(false)
    setCheckImg2(!CheckImg2)
  }

  const moveHistory = () => {
    props.history.push('/history')
  }

  if (Checked === "none") {
    return (
      <>
        <ContentBox className="ani-fadein">
          <div className="check-img-box">
            <div className="flex-box">
              <BasicBtn onClick={onCheckImg} style={{marginRight:"10px"}}>식단표 확인</BasicBtn>
              <BasicBtn onClick={onCheckImg2}>체크표 확인</BasicBtn>
            </div>
            {CheckImg && <img src={`${API_SERVER}/images/${GetLunchImg}`}/>}
            {CheckImg2 && <img src={`${API_SERVER}/images/${GetCheckhImg}`}/>}
          </div>
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
          <div className="flex-box d-col">
            <span className="ic-check ani-fadein">
              <antIcon.CheckOutlined /> 식단체크 참여 완료
            </span>
            <BasicBtn type="button" className="ani-fadein delay-1" style={{marginTop:"15px"}} onClick={moveHistory}>체크 내역보기</BasicBtn>
          </div>
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

export default withRouter(CheckPage);
