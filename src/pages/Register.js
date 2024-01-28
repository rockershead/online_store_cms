import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const contact = e.target.contact.value;
    const age = e.target.age.value;

    if (password.length < 6) {
      alert("Password length must have 6 characters or more");
    }

    if (password !== confirm_password) {
      alert("Passwords do not match");
    }

    try {
      axios
        .post(process.env.REACT_APP_API_URL + "/auth/register", {
          name: name,
          email: email,
          password: password,
          contact: contact,
          age: age,
        })
        .then(
          (response) => {
            if (response.status !== 200) {
              alert("Failed to create an account");
            } else {
              alert(
                "Account created successfully.Please click the link sent to your email to verify."
              );
              navigate("/");
            }
          },
          (error) => {
            alert(error);
          }
        );
    } catch {
      alert(error);
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
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
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
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
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
