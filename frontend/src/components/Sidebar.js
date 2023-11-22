import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CalendarMonth,
  Dashboard,
  ExitToApp,
  Healing,
  LocalShipping,
  People,
  Pets,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth";

import styles from "../css/Sidebar.module.css";
import logo from "../images/logo.svg";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService().removeToken();
    navigate("/login");
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
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles["welcome-message"]}>
          <p>Bem vindo!</p>
        </div>
      </div>
      ;
      <List>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/dashboard"
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Dashboard"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/vets"
        >
          <ListItemIcon>
            <Healing />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Veterinários"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/animals"
        >
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Animais"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/appointments"
        >
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Agendamentos"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/owners"
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Proprietários"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/species"
        >
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Espécies"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/providers"
        >
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Fornecedores"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          component={Link}
          to="/races"
        >
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <ListItemText
            className={styles["sidebar-list-item-text"]}
            primary="Raças"
          />
        </ListItemButton>
        <ListItemButton
          className={styles["sidebar-list-button"]}
          onClick={handleLogout}
        >
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
