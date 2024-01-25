import { useHistory } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
//import firebase from '../utils/firestore';
import {
  Button,
  Typography,
  styles,
  Container,
  TextField,
  makeStyles,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#33ffe0",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[2].value;

    console.log(email);
    console.log(password);

    try {
      setError("");
      setLoading(true);
      //call the login api

      axios
        .post(config.API_URL + "/auth/login", {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            if (response.status === 200) {
              localStorage.setItem("user", JSON.stringify(response.data));
              // update the auth context
              dispatch({ type: "LOGIN", payload: response.data });
              history.push("/");
            } else {
              alert("You have typed an incorrect email or password");
            }
          },
          (error) => {
            alert("You have typed an incorrect email or password");
          }
        );
    } catch {
      alert("You have typed an incorrect email or password");
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={(e) => handleLogin(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className={classes.button}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/ForgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
