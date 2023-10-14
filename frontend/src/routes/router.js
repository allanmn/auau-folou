import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AttemptPage from "../screens/Attempt";
import Login from "../screens/Login";

export default () => (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<AttemptPage/>}/>
      </Routes>
    </Router>
  </div>
);
