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
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(20)
  const [ListSize, setListSize] = useState()
  const [fetching, setFetching] = useState(false);
 
  useEffect(() => {
    if (user.userData) {
      const variables = {
        ...user.userData,
        skip: Skip,
        limit: Limit,
      }
      getHistory(variables);
    }
  }, [user]);

  const getHistory = async (variables) => {
    setFetching(true);
    await axios.post(`${API_SERVER}/api/users/history`, variables)
        .then(response => {
            if (response.data.dataCheck) {
                if (variables.loadMore) {
                  setHistory([...History,...response.data.data])
                  
                } else {
                  setHistory(response.data.data)
                }
                setListSize(response.data.listSize)
              } else {
                alert('체크리스트를 가져오는데 실패했습니다.')
            }
        })
        setFetching(false);
}

const [TopFix, setTopFix] = useState(false)
// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
    let skip = Skip + Limit;
    const variables = {
        ...user.userData,
        skip: skip,
        limit: Limit,
        loadMore: true,
    }    
    getHistory(variables)
    setSkip(skip)
  }
  if(scrollTop > 150){
    setTopFix(true)
  }else{
    setTopFix(false)
  }
 };
 
 useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
});



  if (History) {
    const AllCount = History.length
    const chkCount1 = History.filter(el => el.check === 'radio1').length
    const chkCount2 = History.filter(el => el.check === 'radio2').length
    const chkPer1 = chkCount1/AllCount * 100
    const chkPer2 = chkCount2/AllCount * 100
    return (
      <>
        <ContentBox>
          {TopFix && <div style={{height:'69px'}}></div>}
          <div className={"ani-fadein history-top-fix " + (TopFix ? 'on ani-down' : "")}>
            <h4>{user.userData.name}님의 최근 {AllCount}일간 식단횟수</h4>
            <CheckChart style={{marginBottom:'20px'}}>            
              <div className="chk1" style={{width:`${chkPer1}%`}}>
                <span>{chkCount1}회</span>
              </div>
              <div className="chk2" style={{width:`${chkPer2}%`}}>
              <span>{chkCount2}회</span>
              </div>
            </CheckChart>
          </div>
          <div className="ani-fadein delay-1">
            <h4 className="ani-fadein delay-1">{user.userData.name}님의 최근 {AllCount}일간 식단체크{History.length}</h4>
            <ul className="my-history">
              {History.map((list, index) => (
                <li className={`ani-fadein list ${list.check}`} key={index}>
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
            {ListSize < Limit &&
                <p style={{textAlign:"center"}}>모든 체크리스트를 가져왔습니다.</p>
            }
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

export default HistoryPage;
