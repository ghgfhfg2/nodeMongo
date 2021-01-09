import React, { useState, useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { getDateFormat, getFormatDate } from "./Func";
import axios from "axios";
import Loading from "./Loading";
import styled from "styled-components";

const CheckerBox = styled.div`
  display: ${(props) => (props.chkconfirm ? "block" : "none")};
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
    setChkConfirm(true);
  };

  if (History) {
    return (
      <>
        <ContentBox>
          <button type="button" onClick={CheckerHandler}>
            명단확인
          </button>
          <CheckerBox chkconfirm={ChkConfirm}>
            <dl>
              <dt>전체</dt>
              <dd>{UserAll && UserAll.length}</dd>
            </dl>
            <dl>
              <dt>체크한사람/안한사람</dt>
              <dd>
                {Checker.length}/{NonChecker.length}
              </dd>
            </dl>
            <ul>
              {NonChecker &&
                NonChecker.map((list, index) => (
                  <li key={index}>{list.name}</li>
                ))}
            </ul>
          </CheckerBox>
          <ul className="myinfo">
            {History.map((list, index) => (
              <li key={index}>
                <div>
                  <span className="name">{list.name}</span>
                  <span className="date">
                    {getDateFormat(String(list.date), "xxxx-xx-xx")}({list.day})
                  </span>
                  <span className="choice">{list.check}</span>
                </div>
                <p>{list.comment}</p>
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

export default AdminPage;
