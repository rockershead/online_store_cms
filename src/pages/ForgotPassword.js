import { useNavigate } from "react-router-dom";
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

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    try {
      await axios.post(process.env.REACT_APP_API_URL + "/auth/resetPassword", {
        email: email,
      });
      alert("Please refer to your email for the verification code");
      navigate(`/NewPassword?email=${email}`);
    } catch (err) {
      alert(err);
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
          onSubmit={(e) => handleSubmit(e)}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
