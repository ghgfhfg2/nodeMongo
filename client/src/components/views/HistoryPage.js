import React, { useState, useEffect } from "react";
import { BasicBtn, ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDateFormat } from "./Func";
import Loading from "./Loading";
import { Row, Col, Popover } from "antd";

function HistoryPage(props) {
  const user = useSelector((state) => state.user);
  const [History, setHistory] = useState();
  useEffect(() => {
    if (user.userData) {
      axios
        .post("/api/users/history", user.userData)
        .then((res) => res.data.data)
        .then((res) => setHistory(res));
    }
  }, [user]);

  if (History) {
    return (
      <>
        <ContentBox>
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
                    <span className="date">
                      {getDateFormat(String(list.date), "xxxx-xx-xx")}(
                      {list.day})
                    </span>
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

export default HistoryPage;
