import React from "react";
import Sidebar from "./HOME-PAGE/Sidebar/Sidebar";
import Container from "./HOME-PAGE/Container/Container";
import { BrowserRouter } from "react-router-dom";
import UserDataContext from "./DataContext";

export default function App() {

  return (
    <UserDataContext>
    <div className="App">
      <Sidebar />
      <Container />
    </div>
    </UserDataContext>
  );
}
