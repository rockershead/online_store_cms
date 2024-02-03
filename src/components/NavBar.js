import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  makeStyles,
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
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "wrap",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "light-blue",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  linkText: {
    marginRight: theme.spacing(2),
    color: "white",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  console.log(user);
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
          <div className={classes.links}>
            <Link to="/" className={classes.link}>
              <HomeIcon />
              <Typography variant="body1" className={classes.linkText}>
                Home
              </Typography>
            </Link>
            {user.role === "SUPERADMIN" && (
              <Link to="/UploadProduct" className={classes.link}>
                <AddBoxIcon />
                <Typography variant="body1" className={classes.linkText}>
                  Upload Product
                </Typography>
              </Link>
            )}
            {user ? (
              <IconButton color="inherit" onClick={handleLogOut}>
                <ExitToAppIcon />
                <Typography variant="body1" className={classes.linkText}>
                  Log out
                </Typography>
              </IconButton>
            ) : (
              <>
                <Link to="/login" className={classes.link}>
                  <Typography variant="body1" className={classes.linkText}>
                    Login
                  </Typography>
                </Link>
                <Link to="/register" className={classes.link}>
                  <Typography variant="body1" className={classes.linkText}>
                    Register
                  </Typography>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
