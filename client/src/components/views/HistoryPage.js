import React, { useState, useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import { getDateFormat } from "./Func";
import Loading from "./Loading";

function HistoryPage(props) {
  const user = useSelector((state) => state.user);
  const [History, setHistory] = useState()
  useEffect(() => {
    if (user.userData) {    
      axios.post("/api/users/history",user.userData)
      .then(res => res.data.data)
      .then(res => setHistory(res))      
    }
  }, [user]);

  if(History){
      return (
        <>
          <ContentBox>
            <ul className="myinfo">
              {
                  History.map((list,index) => (
                    <li key={index}>
                        <div>
                        <span className="date">
                            {getDateFormat(String(list.date),'xxxx-xx-xx')}
                            ({list.day})
                        </span>
                        <span className="choice">{list.check}</span>
                        </div>
                        <p>{list.comment}</p>
                    </li>
                  ))
              }
    
            </ul>
          </ContentBox>
        </>
      );
  }else{
      return (
          <>
            <ContentBox>
                <Loading />
            </ContentBox>
          </>
      )
  }
}

export default HistoryPage;
