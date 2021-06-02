import React from "react";
import { useHistory } from "react-router-dom";
import ProvinaLogo from "../assets/img/Logo.jpeg";


import "./Header.css";

function Header() {
  const history = useHistory();

  function backToItems(){
    history.push("/posts");
  }
  function disconnect() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="header">
      <div className="logo" onClick={() => backToItems()}> <img src={ProvinaLogo} alt="Logo" /></div>
      <div className="header-right">
        <button className="active" onClick={() => disconnect()}>Desconectar</button>
      </div>
    </div>
  );
}

export default Header;
