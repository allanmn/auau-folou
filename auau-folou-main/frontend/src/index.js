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
import Base from "./screens/Base";
import { ToastContainer } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import br from "date-fns/locale/pt-BR";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route exact path="/attempt" red element={<AttemptPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<Base key="dashboard" />} />
      <Route exact path="/owners" element={<Base key="owners" />} />
      <Route
        exact
        path="/owners/create"
        element={<Base key="owners/create" />}
      />
      <Route
        exact
        path="/owners/update/:id"
        element={<Base key="owners/update/:id" />}
      />
      <Route exact path="/races" element={<Base key="races" />} />
      <Route exact path="/races/create" element={<Base key="races/create" />} />
      <Route
        exact
        path="/races/update/:id"
        element={<Base key="races/update/:id" />}
      />
      <Route exact path="/vets" element={<Base key="vets" />} />
      <Route exact path="/vets/create" element={<Base key="vets/create" />} />
      <Route
        exact
        path="/vets/update/:id"
        element={<Base key="vets/update/:id" />}
      />
      <Route exact path="/animals" element={<Base key="animals" />} />
      <Route
        exact
        path="/animals/create"
        element={<Base key="animals/create" />}
      />
      <Route
        exact
        path="/animals/update/:id"
        element={<Base key="animals/update/:id" />}
      />
      <Route exact path="/supliers" element={<Base key="supliers" />} />
      <Route
        exact
        path="/supliers/create"
        element={<Base key="supliers/create" />}
      />
      <Route
        exact
        path="/medicines/update/:id"
        element={<Base key="medicines/update/:id" />}
      />
        <Route exact path="/medicines" element={<Base key="medicines" />} />
      <Route
        exact
        path="/medicines/create"
        element={<Base key="medicines/create" />}
      />
      <Route
        exact
        path="/medicines/update/:id"
        element={<Base key="medicines/update/:id" />}
      />
      <Route exact path="/species" element={<Base key="species" />} />
      <Route
        exact
        path="/species/create"
        element={<Base key="species/create" />}
      />
      <Route
        exact
        path="/species/update/:id"
        element={<Base key="species/update/:id" />}
      />
      <Route exact path="/" element={<Navigate to="/attempt" />} />
    </Fragment>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={br}>
    <ToastContainer />
    <RouterProvider router={router} />
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
