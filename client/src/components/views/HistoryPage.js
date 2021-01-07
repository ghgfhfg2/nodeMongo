import React, { useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";

function HistoryPage(props) {
  const user = useSelector((state) => state.user.userData);
  if (user) {
    console.log(user.name);
  }
  /*
  useEffect(() => {
    axios
      .post("/api/users/history",user)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  */
  return (
    <>
      <ContentBox>
        <ul className="myinfo">
          <li>
            <div>
              <span className="date">2020.12.17(목)</span>
              <span className="choice">type1</span>
            </div>
            <p>내용</p>
          </li>
          <li>
            <div>
              <span className="date">2020.12.17(목)</span>
              <span className="choice">type1</span>
            </div>
            <p>내용</p>
          </li>
        </ul>
      </ContentBox>
    </>
  );
}

export default HistoryPage;
