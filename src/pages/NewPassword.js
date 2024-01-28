import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Typography,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const NewPassword = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const email = new URLSearchParams(window.location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/confirmResetPassword",
        {
          code: code,
          email: email,
          newPassword: newPassword,
        }
      );

      alert("Password changed sucessfully");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Password
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
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="off"
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            autoComplete="off"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewPassword;
