import React from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import RightMenu from "./RightMenu";
const { Header } = Layout;
function NavBar(props) {
  return (
    <>
      <Header className="header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="left-nav">
            <a href="/">
              홈
            </a>
            <a href="/check">식단체크</a>
            <a href="/history">체크내역</a>
          </div>
          <div>
            <RightMenu />
          </div>
        </div>
      </Header>
    </>
  );
}

export default withRouter(NavBar);
