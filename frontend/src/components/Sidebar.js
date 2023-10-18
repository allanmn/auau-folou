import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, Assignment, Description, ExitToApp } from "@mui/icons-material";
import styles from "../css/Sidebar.module.css";

const Sidebar = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout button clicked");
  };

  return (
    <Drawer
      className={styles["drawer-sidebar"]}
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#D9D9D9",
        },
      }}
    >
      <div className={styles["sidebar-top"]}>
        <div className={styles.logo}>
          <img src="assets/logo.svg" alt="Logo" />
        </div>
        <div className={styles["welcome-message"]}>
          <p>Bem vindo!</p>
        </div>
      </div>
      ;
      <List>
        <ListItemButton className={styles["sidebar-list-button"]}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Dashboard"
          />
        </ListItemButton>
        <ListItemButton className={styles["sidebar-list-button"]} onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Sair"
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
