import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import AttemptPage from "./screens/Attempt";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Base from "./screens/Base";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route exact path="/attempt" red element={<AttemptPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Base />} />
      <Route exact path="/" element={<Navigate to="/attempt" />} />
    </Fragment>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
