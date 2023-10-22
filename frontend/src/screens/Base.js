import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";

import "../css/Base.css";
import OwnersList from "./owners/ListOwnersPage";
import CreateOwnerPage from "./owners/CreateOwnerPage";

class Base extends Component {
  constructor(props) {
    super(props);
    let path = window.location.pathname;

    this.state = {
      currentPage: path ?? "/dashboard",
      content: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      console.log("atualizou rota");
    }
  }

  updateContent() {
    switch (this.state.currentPage) {
      case "/dashboard":
        this.setContent(<Dashboard />);
        break;
      case "/owners/create":
        this.setContent(<CreateOwnerPage />);
        break;
      case "/owners":
        this.setContent(<OwnersList />);
        break;
      default:
        this.setContent(<Dashboard />);
    }
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

export default Base;
