import React, { useState, useEffect } from "react";
import { ContentBox } from "./CheckPage";
import { useSelector } from "react-redux";
import { getDateFormat, getFormatDate } from "./Func"
import axios from "axios";
import Loading from "./Loading"

  const currentDate = getFormatDate(new Date());
  const body = {
      date:Number(currentDate.split("|")[0])
    };
function AdminPage() {
    const [History, setHistory] = useState()
    useEffect(() => {
        axios.post("/api/users/historyAll",body)
        .then(res => res.data.data)
        .then(res => setHistory(res))      
    }, []);

    const [UserAll, setUserAll] = useState()
    useEffect(() => {
        axios.get("/api/users/userNormal")
        .then(res => res.data.data)
        .then(res => setUserAll(res))    
    }, [UserAll]); 
    
    // const [NonChecker, setNonChecker] = useState()
    // const nonChecker = () => {
    //     UserAll.filter(list => {
    //         return list.date != 
    //     }) 
    // }
    if(History){
        return (
          <>
            <ContentBox> 
              <dl>
                  <dt>전체</dt>
              <dd>{UserAll && UserAll.length}</dd>
              </dl>
              <dl>
                  <dt>체크한사람/안한사람</dt>
                  <dd>{History.length}/{UserAll && UserAll.length - History.length}</dd>
                  {/* <dd><button type="button" onClick={nonChecker}>안한사람보기</button></dd> */}
              </dl>
              {/* <ul>
                  {
                     NonChecker && NonChecker.map((list,index) => (
                        <li key={index}>
                            {list.name}
                        </li>
                      ))
                  }
              </ul>  */}
              <ul className="myinfo">
                {
                    History.map((list,index) => (
                      <li key={index}>
                          <div>
                            <span className="name">{list.name}</span>
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

export default AdminPage
