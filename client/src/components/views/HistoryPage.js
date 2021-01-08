import React, { useState, useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import axios from "axios";

function getDateFormat(date , type, s) {
    let ck;
    let rtstr = "";
    let j = 0;
    for(let i = 0; i < type.length; i++) {
            if(type.substring(i,i+1) == 'x') {
                rtstr += date.substring(j,j+1);
            } else {
            j--;
            rtstr += type.substring(i,i+1);
            }
        j++;
    } 
    if(s == "dw") {
        document.write(rtstr);
    } else {
        return rtstr;
    }
}
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
                loading...
            </ContentBox>
          </>
      )
  }
}

export default HistoryPage;
