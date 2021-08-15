import "./App.css";
import React, { useState } from "react";
import Navbarx from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";

export default function App() {
  const storage = window.localStorage;
  const [currUser, setCurruser] = useState(storage.getItem("user"));
  const [showreg, setshowReg] = useState(currUser ? false : true);
  const [showlogin, setshowLogin] = useState(currUser ? false : true);
  const [showlogout, setshowLogout] = useState(currUser ? true : false);
  return (
    <div style={{ backgroundColor: "#dedeed", height: "100vh" }}>
      <Router>
        <Navbarx
          title="Trip-Helper"
          showreg={showreg}
          showlogin={showlogin}
          showlogout={showlogout}
          setshowReg={setshowReg}
          setshowLogin={setshowLogin}
          setshowLogout={setshowLogout}
          setCurruser={setCurruser}
          storage={storage}
        />
        <Switch>
          <Route exact path="/">
            <Home currUser={currUser} setCurruser={setCurruser} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <div className="d-flex justify-content-center align-item-center mt-5">
              <Login
                currUser={currUser}
                setCurruser={setCurruser}
                setshowReg={setshowReg}
                setshowLogin={setshowLogin}
                setshowLogout={setshowLogout}
                storage={storage}
              />
            </div>
          </Route>
          <Route exact path="/signup">
            <div className="d-flex justify-content-center align-item-center mt-5">
              <Signup />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
