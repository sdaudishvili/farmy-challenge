import { AppBar, Container, ListItemText, MenuItem, MenuList, Toolbar } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <MenuList sx={{ display: "flex", alignItems: "center" }}>
            <MenuItem component={Link} to="/salads">
              <ListItemText>Salads List</ListItemText>
            </MenuItem>
            <MenuItem component={Link} to="/salads/create">
              <ListItemText>Create Salad</ListItemText>
            </MenuItem>
            <MenuItem component={Link} to="/product-ordering">
              <ListItemText>Product ordering</ListItemText>
            </MenuItem>
          </MenuList>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default DefaultLayout;
