import React, { useState, useEffect } from "react";
import { BasicBtn, ContentBox } from "./CheckPage";
import { getFormatDate } from "./Func";
import axios from "axios";
import Loading from "./Loading";
import styled from "styled-components";
import { Row, Col, Popover } from "antd";

const CheckerBox = styled.div`
  display: ${(props) => (props.chkconfirm ? "block" : "none")};
  margin:10px 0;
  dl{
    display:flex;margin-bottom:0;
  }
  dt{font-weight:700}
  .flex-box{flex-direction:column;flex:1;
    dl{width:100%}    
    ul{display:flex;flex-wrap:wrap;}
    li{margin-right:5px;margin-bottom:5px;padding:2px 5px 2px 10px;position:relative;border:1px solid #888}
    li::before{content:"";display:inline-block;width:4px;height:100%;background:#888;position:absolute;left:0;top:0;}
  }
`;

const currentDate = getFormatDate(new Date());
const dbDate = Number(currentDate.split("|")[0]);
const body = {
  date: Number(currentDate.split("|")[0]),
};
function AdminPage() {
  const [History, setHistory] = useState();
  useEffect(() => {
    axios
      .post("/api/users/historyAll", body)
      .then((res) => res.data.data)
      .then((res) => setHistory(res));
  }, []);

  const [UserAll, setUserAll] = useState();
  useEffect(() => {
    axios
      .get("/api/users/userNormal")
      .then((res) => res.data.data)
      .then((res) => setUserAll(res));
  }, []);

  const [ChkConfirm, setChkConfirm] = useState(false);
  const [Checker, setChecker] = useState([]);
  const [NonChecker, setNonChecker] = useState([]);

  const CheckerHandler = () => {
    const Chk = UserAll.filter((list) => {
      return list.lastCheck == dbDate;
    });
    const nonChk = UserAll.filter((list) => {
      return list.lastCheck != dbDate;
    });
    setChecker(Chk);
    setNonChecker(nonChk);
    setChkConfirm(!ChkConfirm);
  };

  if (History) {
    return (
      <>
        <ContentBox>
          <BasicBtn className="border" style={{maxWidth:'400px'}} type="button" onClick={CheckerHandler}>
            명단확인
          </BasicBtn>
          <CheckerBox chkconfirm={ChkConfirm}>
            <dl>
              <dt>전체 :</dt>
              <dd>&nbsp;{UserAll && UserAll.length}명</dd>
            </dl>
            <div className="flex-box">
            <dl>
              <dt>체크 안한사람 :</dt>
              <dd>&nbsp;{NonChecker.length}명</dd>
            </dl>
            <ul>
              {NonChecker &&
                NonChecker.map((list, index) => (
                  <li key={index}>{list.name+`(${list.part})`}</li>
                ))}
            </ul>
            </div>
          </CheckerBox>
          <h2 className="sub-h2">체크한 사람 목록</h2>
          <Row className="my-history" gutter={10}>
            {History.map((list, index) => (
              <Col lg={8} md={12} xs={24} key={index}>
                <div className={`list ${list.check}`}>
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
                    <div className="checker-info">
                      <div className="name">{`${list.name}(${list.part})`}</div>
                      <span className="date">
                        체크한 시간 : {list.time}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
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

export default AdminPage;
