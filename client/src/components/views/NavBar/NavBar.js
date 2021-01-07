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
          <div>
            <a style={{ marginRight: "15px" }} href="/">
              home
            </a>
            <a style={{ marginRight: "15px" }} href="/check">check</a>
            <a style={{ marginRight: "15px" }} href="/history">history</a>
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
