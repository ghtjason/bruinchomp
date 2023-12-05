import React, { useState } from "react";
import axios from "axios";
import {
  Stack,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Cookies from "js-cookie"; // cookiessssss
import { useNavigate } from "react-router-dom"; // for create account redirection

const Login = () => {
  //Modifies the state
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();
    console.log(email);
    console.log(pass);

    setMessage("Processing...");

    // handle logging in: can split into utils file or seperate function later
    let data = JSON.stringify({
      username: email,
      password: pass,
    });

    let config = {
      method: "post",
      url: "https://api-m46o.onrender.com/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        let token = response.data.access_token;
        if (token) {
          // if token is successfully found
          setMessage("Logged in successfully!");
          Cookies.set("authToken", token, { expires: 7 }); // 'expires' sets the expiration date in days
          console.log("Success");
          navigate("/profile");
          window.location.reload(); // reload the page
        } else setMessage("Account does not exist / Password incorrect");
        console.log(JSON.stringify(response.data)); // auth token
      })
      .catch((error) => {
        setMessage("error");
        console.log(error);
      });
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // remove authToken cookie
    window.location.reload(); // reload the page
  };

  const handleCreateRedir = () => {
    navigate("/register");
  };

  // CSS
  const loginContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "75vh",
    width: "100%",
  };
  const cardStyle = {
    width: "300px",
    textAlign: "center",
  };
  const formFieldStyle = {
    marginBottom: "20px",
  };
  const buttonStyle = {
    marginRight: "10px",
  };
  const errorMsgStyle = {
    color: "red",
    fontSize: "80%",
    marginBottom: "20px",
  };

  // check if user is logged in & display accordingly
  const authToken = Cookies.get("authToken");
  console.log();
  // if user is logged in:
  if (authToken) {
    console.log("Authentication Token:", authToken);
    return (
      <>
        <Typography variant="body2">You are already logged in!</Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
    // if user is not logged in:
  } else {
    console.log("Authentication Token not found.");
    return (
      <div style={loginContainerStyle}>
        <Card style={cardStyle}>
          <CardContent>
            <h2>Login</h2>
            <form>
              <TextField
                style={formFieldStyle}
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                style={formFieldStyle}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e) => setPass(e.target.value)}
              />
              <Typography variant="body2" style={errorMsgStyle}>
                {message}
              </Typography>
              <Button
                style={formFieldStyle}
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Log in
              </Button>
            </form>
            <Button
              variant="outlined"
              style={buttonStyle}
              onClick={handleCreateRedir}
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Login;
