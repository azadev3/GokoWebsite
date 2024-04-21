import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.scss";
import App from "./App";
import SearchPage from "./HOME-PAGE/Pages/Search/SearchPage";
import Sidebar from "./HOME-PAGE/Sidebar/Sidebar";
import Messages from "./HOME-PAGE/Pages/Messages/Messages";
import Settings from "./HOME-PAGE/Pages/Settings/Settings";
import Support from "./HOME-PAGE/Pages/Support/Support";
import Reg from "./HOME-PAGE/Pages/Register_Login/Reg";
import Log from "./HOME-PAGE/Pages/Register_Login/Log";
import './Responsive.scss';
//======================================= USER LOGGED IN PROCESS FILES ====----===-==-===-=-=-
import Account from './Account/Account/Account';

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route
        path="/search-axtarish"
        element={
          <React.Fragment>
            <Sidebar /> <SearchPage />
          </React.Fragment>
        }
        />
      <Route
        path="/messages-mesajlar"
        element={
          <React.Fragment>
            <Sidebar />
            <Messages />
          </React.Fragment>
        }
        />

      <Route
        path="/settings-tenzimlemeler"
        element={
          <React.Fragment>
            <Sidebar />
            <Settings />
          </React.Fragment>
        }
      />

      <Route
        path="/support-destek-bolmesi"
        element={
          <React.Fragment>
            <Sidebar />
            <Support />
          </React.Fragment>
        }
        />

      <Route
        path="/qeydiyyat-register"
        element={
          <React.Fragment>
            <Reg />
          </React.Fragment>
        }
        />

       <Route
        path="/daxil-ol-login"
        element={
          <React.Fragment>
            <Log />
          </React.Fragment>
        }
        />

        <Route
        path="/profile"
        element={<Account />}
        />        

       
    </Routes>
  </BrowserRouter>  

);
