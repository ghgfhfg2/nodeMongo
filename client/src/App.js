import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CheckPage from "./components/views/CheckPage";
import HistoryPage from "./components/views/HistoryPage";
import AdminPage from "./components/views/AdminPage";
import Auth from "./hoc/auth";
import Nav from "./components/views/NavBar/NavBar";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)}></Route>
        <Route exact path="/check" component={Auth(CheckPage, true)}></Route>
        <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
        <Route
          exact
          path="/register"
          component={Auth(RegisterPage, false)}
        ></Route>
        <Route
          exact
          path="/history"
          component={Auth(HistoryPage, true)}
        ></Route>
        <Route exact path="/admin" component={Auth(AdminPage, true, true)}></Route>
      </Switch>
    </Router>
  );
}

export default App;
