import React, { useState, useEffect } from "react";
import { BasicBtn, ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDateFormat } from "./Func";
import Loading from "./Loading";
import { Row, Col, Popover } from "antd";
import { API_SERVER } from "../../Config"

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
    return (
      <>
        <ContentBox>
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
