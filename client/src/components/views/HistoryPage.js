import React, { useState, useEffect } from "react";
import { BasicBtn, ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDateFormat } from "./Func";
import Loading from "./Loading";
import { Popover } from "antd";
import { API_SERVER } from "../../Config"
import styled from "styled-components";

const CheckChart = styled.div`
  width:100%;height:20px;display:flex;border-radius:4px;overflow:hidden;
  div{
    height:100%;position:relative;font-size:12px;color:#fff;text-align:center;
  }
  .chk1{
    background:#ff5516;
  }
  .chk2{
    background:#75bf61;
   }
`
function HistoryPage(props) {
  const user = useSelector((state) => state.user);
  const [History, setHistory] = useState();
  useEffect(() => {
    if (user.userData) {
      axios
        .post(`${API_SERVER}/api/users/history`, user.userData)
        .then((res) => res.data.data)
        .then((res) => setHistory(res));
    }
  }, [user]);

  if (History) {
    const AllCount = History.length
    const chkCount1 = History.filter(el => el.check === 'radio1').length
    const chkCount2 = History.filter(el => el.check === 'radio2').length
    const chkPer1 = chkCount1/AllCount * 100
    const chkPer2 = chkCount2/AllCount * 100
    return (
      <>
        <ContentBox>
          <h4>{user.userData.name}님의 최근 4주간 식단횟수</h4>
          <CheckChart style={{marginBottom:'20px'}}>            
            <div className="chk1" style={{width:`${chkPer1}%`}}>
              <span>{chkCount1}회</span>
            </div>
            <div className="chk2" style={{width:`${chkPer2}%`}}>
            <span>{chkCount2}회</span>
            </div>
          </CheckChart>
          <h4>{user.userData.name}님의 최근 4주간 식단체크</h4>
          <ul className="my-history">
            {History.map((list, index) => (
              <li className={`list ${list.check}`} key={index}>
                  <div className="history-flex-box">
                    <span className="choice">
                      <i></i>
                      {list.comment && (
                        <Popover
                          content={`                      
                        ${list.comment}                      
                      `}
                          trigger="click"
                        >
                          <BasicBtn
                            className="border gray"
                            type="button"
                            style={{
                              marginLeft: "15px",
                              width: "auto",
                              padding: "0 10px",
                              flexShrink: "0",
                              fontSize: "12px",
                            }}
                          >
                            Commnet
                          </BasicBtn>
                        </Popover>
                      )}
                    </span>
                    <span className="date">
                      {getDateFormat(String(list.date), "xxxx-xx-xx")}(
                      {list.day}) {list.time.substring(0,2)+'시 '+list.time.substring(2,4)+"분"}
                    </span>
                  </div>
              </li>
            ))}
          </ul>
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

export default HistoryPage;
