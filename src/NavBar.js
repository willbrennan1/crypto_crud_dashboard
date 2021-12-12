// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {AppBar, Toolbar, CssBaseline, Typography, makeStyles} from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
        
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function NavBar() {
    const classes = useStyles();
    
  return (
      <AppBar position="static" style={{background: '#3861fb'}}>
          <CssBaseline />
          <Toolbar>
              <Typography variant="h4" className={classes.logo}>
                  Navbar
              </Typography>
                <div className={classes.navlinks}>
                <NavLink
                    to="/" exact className={classes.link}>
                    Home
                </NavLink>
                <NavLink
                    to="/portfolio" exact className={classes.link}>
                    Portfolio
                </NavLink>
                <NavLink to="/research" exact className={classes.link}>
                    Research
                </NavLink>
                <NavLink to="/graphs" exact className={classes.link}>
                    Graphs
                </NavLink>
                </div>
            </Toolbar>
        </AppBar>
  );
}

export default NavBar;