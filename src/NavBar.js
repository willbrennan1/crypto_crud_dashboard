// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

function NavBar() {
  return (
    <div>
      <NavLink
        to="/"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/portfolio"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Portfolio
      </NavLink>
      <NavLink
        to="/research"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Research
      </NavLink>
      <NavLink
        to="/graphs"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Graphs
      </NavLink>
      
    </div>
  );
}

export default NavBar;