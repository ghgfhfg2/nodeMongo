import React, { useState, useEffect } from "react";
import { BasicBtn, ContentBox } from "./CheckPage";
import { getFormatDate } from "./Func";
import axios from "axios";
import Loading from "./Loading";
import styled from "styled-components";
import { Popover } from "antd";
import { BasicSelect } from "./RegisterPage/RegisterPage";
import { API_SERVER } from "../../Config"

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
    li{margin-right:5px;margin-bottom:5px;padding:3px 5px 3px 10px;position:relative;border:1px solid #ddd;font-size:12px;font-weight:700}
    li::before{content:"";display:inline-block;width:4px;height:calc(100% + 2px);background:#888;position:absolute;left:0;top:0;}
  }
`;
const FileLabel = styled.label`
  display:flex;width:60px;height:60px;border:1px solid #ddd;
  border-radius:5px;flex-shrink:0;justify-content:center;align-items:center;
  font-size:12px;color:#888;
  img{
    max-height:100%;
  }
`

const currentDate = getFormatDate(new Date());
const dbDate = Number(currentDate.split("|")[0]);
function AdminPage() {
  const [History, setHistory] = useState();
  const [SortValue, setSortValue] = useState("date1")
  const HistorySort = (e) => {
    setSortValue(e.target.value)
  }  
  const body = {
    date: Number(currentDate.split("|")[0]),
    sort: SortValue
  };
  useEffect(() => {
    axios
      .post(`${API_SERVER}/api/users/historyAll`, body)
      .then((res) => res.data.data)
      .then((res) => setHistory(res));
  }, [SortValue]);

  const [UserAll, setUserAll] = useState();
  useEffect(() => {
    axios
      .get(`${API_SERVER}/api/users/userNormal`)
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

  const [Image, setImage] = useState()
  const [Image2, setImage2] = useState()
  const [LunchImg, setLunchImg] = useState()
  const [LunchImg2, setLunchImg2] = useState()
  const onFileChange = (e) => {
    let reader = new FileReader();
    reader.onload = function(event) { 
      setLunchImg(event.target.result); 
    }; 
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0])
  }
  const onFileChange2 = (e) => {
    let reader = new FileReader();
    reader.onload = function(event) { 
      setLunchImg2(event.target.result); 
    }; 
    reader.readAsDataURL(e.target.files[0]);
    setImage2(e.target.files[0])
    //setLunchImg2(e.target.files[0].name)
  }  
  const imgUpload = async () => {
    const formData = new FormData();
    formData.append('file', Image);
    // 서버의 upload API 호출
    const res = await axios.post(`${API_SERVER}/api/users/upload`, formData)
    .then(res => {
      alert('식단표 업로드 완료')
    });
  }
  const imgUpload2 = async () => {
    const formData = new FormData();
    formData.append('file', Image2);
    // 서버의 upload API 호출
    const res = await axios.post(`${API_SERVER}/api/users/upload2`, formData)
    .then(res => {
      alert('체크표 업로드 완료')
    });
  }


  if (History) {
    return (
      <>
        <ContentBox>
          <form className="admin-form" action='upload' method='post' encType="multipart/form-data">
            <input className="custom-file" type="file" id="imgFile1" onChange={onFileChange} />
            <FileLabel htmlFor="imgFile1" style={{marginRight:'5px'}}>              
              {LunchImg && <img src={`${LunchImg}`} />}
              {!LunchImg && `식단표`}
            </FileLabel> 
            <BasicBtn className="border" style={{height:'60px'}} type="button" onClick={imgUpload}>
              업로드
            </BasicBtn>
            <input className="custom-file" type="file" id="imgFile2" onChange={onFileChange2} />
            <FileLabel htmlFor="imgFile2" style={{margin:'0 5px 0 15px'}}>              
              {LunchImg2 && <img src={`${LunchImg2}`} />}
              {!LunchImg2 && `체크표`}
            </FileLabel> 
            <BasicBtn className="border" style={{height:'60px'}} type="button" onClick={imgUpload2}>
              업로드
            </BasicBtn>
          </form>
          
          <BasicBtn className="border" type="button" onClick={CheckerHandler}>
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
            <table className="admin-table" style={{marginBottom:'0'}}>
              <thead>
                <tr>
                  <th scope="col">이름</th>
                  <th scope="col">부서</th>
                </tr>
              </thead>
              <tbody>
              {NonChecker &&
                NonChecker.map((list, index) => (
                  <tr key={index}>
                    <td>{list.name}</td>
                    <td>{list.part}</td>
                  </tr>
                ))}             
                </tbody>
            </table>
            </div>
          </CheckerBox>
          <div className="flex-box between a-center" style={{marginTop:'20px',marginBottom:"10px"}}>
          <h2 className="sub-h2">체크한 사람 목록</h2>
          <BasicSelect onChange={HistorySort} defaultValue="time" style={{width:'auto'}}>
                  <option value="time">최신</option>
                  <option value="time2">오래된</option>
                  <option value="name">이름</option>
                  <option value="part">부서</option>
          </BasicSelect>
          </div>
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
                    <div className="checker-info">
                      <div className="name">{`${list.name}(${list.part})`}</div>
                      <span className="date">
                        체크한 시간 : {list.time.substring(0,2)+'시 '+list.time.substring(2,4)+"분"}
                      </span>
                    </div>
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

export default AdminPage;
