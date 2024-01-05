import { useHistory } from 'react-router-dom';

import { Button,Typography,styles,Container,TextField,makeStyles,Avatar,CssBaseline,FormControlLabel,Checkbox,Link,Grid,Box} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from "react"
import config from '../config.json';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#33ffe0',
    },
  }));


//user comes to the link only upon clicking link from email

const ResetPassword = () => {
    const classes = useStyles()
    const history = useHistory();
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleReset=async e=>{
        e.preventDefault();
        
        const password=e.target[0].value
        const confirm_password=e.target[4].value

        if(password.length<6)
        {
            alert("Password length must have 6 characters or more")
        }
        
        if (password !== confirm_password) {
            alert("Passwords do not match")
          }
        
        
        try {
            setError("")
            setLoading(true)
           //reset password api call here
            
            
            
          } catch {
            alert("Failed to reset password")
          }
      
          setLoading(false)
    
    
    }


    return (  


        
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={e => handleReset(e)}>
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
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className={classes.button}
            >
              Reset Password
            </Button>
            <Grid container>
              
              <Grid item>
              <Link href="/" variant="body2">
                  {"Back to Login Page"}
                </Link>
              </Grid>
            </Grid>
            
              
            
          </form>
        </div>
        
      </Container>
    );
   
       
   
   
   
   
       


}





export default ResetPassword;