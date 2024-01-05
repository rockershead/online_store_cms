import { useHistory } from 'react-router-dom';
//import firebase from '../utils/firestore';
import { Button,Typography,styles,Container,TextField,makeStyles,Avatar,CssBaseline,FormControlLabel,Checkbox,Link,Grid,Box} from "@material-ui/core";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from "react"
import axios from 'axios';
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




const ForgotPassword = () => {
    const classes = useStyles()
    const history = useHistory();
   
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit=async e=>{
        e.preventDefault();
        
        const email=e.target[0].value
        

        console.log(email)
        
        
        try {
            setError("")
            setLoading(true)
            //check if user exists in DB
            axios.post(config.API_URL+'/user/checkUserExists', {
                email: email,
               
              })
              .then((response) => {
                console.log(response);
                if(response.status!=200)
                {
                    alert("This user does not exist")
                }
                else{
                    console.log("User exists")
                }
                
              }, (error) => {
                alert("This user does not exist")
              });
           
            
          } catch {
            alert("You have typed an incorrect email")
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
            Sign in
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
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
   
       
   
   
   
   
       


}





export default ForgotPassword;