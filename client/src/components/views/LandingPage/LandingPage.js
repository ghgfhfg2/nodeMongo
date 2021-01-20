import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ContentBox } from "../CheckPage";
import * as bsIcon from "react-icons/bs";
const LandingLink = styled.a`
  display: flex;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 0 10px;
  font-size: 20px;
  font-weight: 700;
  color: #555;
  &:hover {
    color: #91d081;
    border-color: #91d081;
    border-width: 2px;
  }
  svg {
    width: 25px;
    height: 25px;
  }
  span {
    display: inline-block;
    margin-left: 7px;
  }
`;

function LandingPage(props) {
  return (
    <>
      <ContentBox>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <LandingLink className="ani-fadeup" href="/check">
            <bsIcon.BsCheckCircle />
            <span>식단체크</span>
          </LandingLink>
          <LandingLink className="ani-fadeup delay-1" href="/history">
            <bsIcon.BsCardChecklist />
            <span>식단내역</span>
          </LandingLink>
        </div>
      </ContentBox>
    </>
  );
}

export default withRouter(LandingPage);
