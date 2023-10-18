import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

import "../css/Base.css";

const Base = () => {
  const { page } = useParams();

  const [currentPage, setCurrentPage] = useState(page ?? "dashboard");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  let content;

  switch (currentPage) {
    case "dashboard":
      content = <Dashboard />;
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
