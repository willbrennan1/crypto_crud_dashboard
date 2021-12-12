import React from "react";
import logo from './logo.png';

function Header() {

  return (
      <div style={{whiteSpace:'nowrap', display:'inline', alignItems:'center'}}>
        <img src={logo} style={{width: 70, height: 70, borderRadius:70}}/>
        <h1 style={{ display: "inline", whiteSpace: "nowrap", margin: 'center', position: "absolute" }}>Crypto "CRUD" Dashboard</h1>
      </div>

  )
}

export default Header;