import { useHistory } from "react-router-dom";
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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[2].value;
    const confirm_password = e.target[4].value;
    const contact = e.target[6].value;
    const age = e.target[8].value;

    console.log(email);
    console.log(password);
    console.log(confirm_password);
    console.log(contact);
    console.log(age);

    if (password.length < 6) {
      alert("Password length must have 6 characters or more");
    }

    if (password !== confirm_password) {
      alert("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      axios
        .post(config.API_URL + "/auth/register", {
          email: email,
          password: password,
          contact: contact,
          age: age,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.status != 200) {
              alert("Failed to create an account");
            } else {
              alert("Account created successfully");
              history.push("/");
            }
          },
          (error) => {
            alert("Failed to create an account");
          }
        );
    } catch {
      alert("Failed to create an account");
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
          Sign Up
        </Typography>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={(e) => handleRegister(e)}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm password"
            label="Confirm Password"
            type="password"
            id="confirm password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="contact"
            label="contact"
            type="text"
            id="contact"
            //autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="age"
            type="number"
            id="age"
            //autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className={classes.button}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Already have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
