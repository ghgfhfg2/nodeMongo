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

function getFormatDate(date){
  var year = date.getFullYear();              
  var month = (1 + date.getMonth());          
  month = month >= 10 ? month : '0' + month;  
  var day = date.getDate();                   
  day = day >= 10 ? day : '0' + day;          
  return  year + '' + month + '' + day;       
}
const currentDate = Number(getFormatDate(new Date()));

function CheckPage(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [radio, setRadio] = useState("");
  const onChageRadio = (e) => {
    setRadio(e.target.value);
  };

  const checkData = useSelector((state) => state.user);
  
  const [Checked, setChecked] = useState(false);
  useEffect(() => {
    if (user.userData) {
      axios.post("/api/users/checkData", user.userData).then((res) => {
        if(res.data.dataCheck && res.data.data){
          const checkedDate = res.data.data.date;
          if (currentDate == checkedDate) {
            setChecked(true);
          } else {
          }
        }        
      });
    }
  }, [user]);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      check: radio,
      name: user.userData.name,
      email: user.userData.email,
      role: user.userData.role,
      date: currentDate,
    };
    dispatch(check(body)).then((res) => {
    });
  };
    if(!Checked){
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
  }else{
    return(
      <>
        <ContentBox>
          checked
        </ContentBox>
      </>
    )
  }
}

export default CheckPage;
