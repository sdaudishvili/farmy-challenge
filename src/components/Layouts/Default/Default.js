/* eslint-disable no-unused-vars */

import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const DefaultLayout = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default DefaultLayout;
