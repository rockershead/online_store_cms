import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  makeStyles,
  useTheme,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      //background: '#f9f9f9',
      width: "100%",
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
      display: "flex",
      backgroundColor: "pink",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    links: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  };
});

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const open = true; // Set the initial value of open
  const { user, dispatch } = useAuthContext();
  const handleLogOut = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
        color="primary"
      >
        <div className={classes.links}>
          <a href="/">Home</a>
          <Link to="/UploadProduct">Upload New Product</Link>

          <nav>
            {user && (
              <div>
                <button onClick={handleLogOut}>Log out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </nav>
        </div>
      </AppBar>
    </nav>
  );
};

export default NavBar;
