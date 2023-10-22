import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";

import "../css/Base.css";
import OwnersList from "./owners/ListOwnersPage";

const Base = () => {
  const location = window.location.pathname;

  const [currentPage, setCurrentPage] = useState(location ?? "/dashboard");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  let content;

  switch (currentPage) {
    case "/dashboard":
      content = <Dashboard />;
      break;
    case "/owners":
      content = <OwnersList />;
      break;
    default:
      content = <Dashboard />;
  }

  return (
    <div className="main">
      <Sidebar changePage={changePage} />
      <div className="content">{content}</div>
    </div>
  );
};

export default Base;
