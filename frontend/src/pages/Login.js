import React, { useState } from "react";
import axios from 'axios'
import { Stack, Box, Typography, Button } from '@mui/material'
import Cookies from 'js-cookie'; // cookiessssss

const Login = () => {
  //Modifies the state
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();
    console.log(email);
    console.log(pass);

    // handle logging in: can split into utils file or seperate function later
    let data = JSON.stringify({
      "username": email,
      "password": pass
    });
    
    let config = {
      method: 'post',
      url: 'https://api-m46o.onrender.com/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      let token = response.data.access_token;
      if (token) { // if token is successfully found
        setMessage("Logged in successfully!");
        Cookies.set('authToken', token, { expires: 7 }); // 'expires' sets the expiration date in days
        window.location.reload(); // reload the page
      }
      else setMessage("Account does not exist / Password incorrect");
      console.log(JSON.stringify(response.data)); // auth token

    })
    .catch((error) => {
      setMessage("error");
      console.log(error);
    });
  };


  // check if user is logged in & display accordingly
  const authToken = Cookies.get('authToken');
  console.log()
  // if user is logged in:
  if (authToken) {
    console.log('Authentication Token:', authToken);
    return (
      <>
        <Typography variant="body2">
          You are already logged in!
        </Typography>
      </>
    );
  // if user is not logged in:
  } else {
    console.log('Authentication Token not found.');    
    return (
      //Placeholder is what is displayed in input before they type
      //Label is the tags displayed ontop of the tags itself
      //Button type = submit it will fire handleSubmit function
      <>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            value={email}
            //type="email"
            placeholder="myemail@gmail.com"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            value={pass}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <button>Signup here</button>
        <Typography variant="body2">
          {message}
        </Typography>
      </>
    );
  }


  
  
};

export default Login;
