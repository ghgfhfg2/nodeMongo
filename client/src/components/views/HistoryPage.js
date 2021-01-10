import React, { useState, useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDateFormat } from "./Func";
import Loading from "./Loading";
import { Row, Col } from "antd";

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
                    <span className="date">
                      {getDateFormat(String(list.date), "xxxx-xx-xx")}(
                      {list.day})
                    </span>
                    <span className="choice">
                      {list.check === "radio1" ? "일반식" : "다식"}
                    </span>
                  </div>
                  {list.comment && (
                    <p style={{ margin: "5px 0 0 0" }}>기타 : {list.comment}</p>
                  )}
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
