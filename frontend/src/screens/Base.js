import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";

import "../css/Base.css";
import OwnersList from "./owners/ListOwnersPage";
import CreateOwnerPage from "./owners/CreateOwnerPage";

import { withRouter } from "../components/WithRouter";
import CreateSpeciePage from "./species/CreateSpeciePage";
import SpeciesPage from "./species/ListSpeciesPage";

class Base extends Component {
  constructor(props) {
    super(props);
    let path = window.location.pathname;

    this.state = {
      currentPage: path ?? "/dashboard",
      content: null,
      id: null,
    };
  }

  updateContent() {
    let currentPage = this.verifyRoute();

    switch (currentPage) {
      case "/dashboard":
        this.setContent(<Dashboard />);
        break;
      case "/owners/create":
        this.setContent(<CreateOwnerPage />);
        break;
      case "/owners":
        this.setContent(<OwnersList />);
        break;
      case "/owners/update":
        this.setContent(<CreateOwnerPage />);
        break;
      case "/species/create":
        this.setContent(<CreateSpeciePage />);
        break;
      case "/species":
        this.setContent(<SpeciesPage />);
        break;
      case "/species/update":
        this.setContent(<CreateSpeciePage />);
        break;
      default:
        this.setContent(<Dashboard />);
    }
  }

  verifyRoute() {
    let currentPage = this.state.currentPage;

    if (currentPage.includes("update")) {
      currentPage = currentPage.replace(/\/update\/\d+/, "/update");
    }

    return currentPage;
  }

  setContent(component) {
    this.setState({
      content: component,
    });
  }

  componentDidMount() {
    this.updateContent();
  }

  render() {
    return (
      <div className="main">
        <Sidebar changePage={this.changePage} />
        <div className="content">{this.state.content}</div>
      </div>
    );
  }

  changePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };
}

export default withRouter(Base);
