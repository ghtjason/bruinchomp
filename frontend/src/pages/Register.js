import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie"; // cookiessssss
import { useNavigate } from "react-router-dom";
import { proxy_server } from "../utils/constants";

// const PASSWORD_REQ = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
  const navigate = useNavigate();
  //Modifies the state
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();

    setMessage("Processing...");

    if (pass !== matchpass) {
      setMessage("Passwords do not match!");
      console.log("passwords do not match"); // replace with UI element later
    } else createUser(username, pass);
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // remove authToken cookie
    window.location.reload(); // reload the page
  };

  // can delegate to utils file later if we want to
  function createUser(username, password) {
    let data = JSON.stringify({
      username: username,
      password: password,
    });

    let config = {
      method: "post",
      url: `${proxy_server}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.success) {
          setMessage("Account created successfully!");
          console.log(JSON.stringify(response.data)); // success?
          navigate("/login");
        } else {
          if (response.data.includes('One or more of the choices')) {
            setMessage("Username contains invalid characters");
          }
          else if (response.data.includes('Length must be')) {
            setMessage("Username length must be between 1 and 20");
          }
          else
            setMessage("Account with username already exists");
          console.log(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        setMessage("error");
        console.log(error);
      });
  }

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
  const errorMsgStyle = {
    color: "red",
    fontSize: "80%",
    marginBottom: "20px",
  };

  // check if user is logged in & display accordingly
  const authToken = Cookies.get("authToken");
  // if user is logged in:
  if (authToken) {
    return (
      <Stack>
        <Typography variant="body2">You are already logged in!</Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    );
    // if user is not logged in:
  } else {
    return (
      <div style={loginContainerStyle}>
        <Card style={cardStyle}>
          <CardContent>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                style={formFieldStyle}
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                style={formFieldStyle}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e) => setPass(e.target.value)}
              />
              <TextField
                required
                style={formFieldStyle}
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e) => setMatchpass(e.target.value)}
              />
              <Typography variant="body2" style={errorMsgStyle}>
                {message}
              </Typography>
              <Button
                disabled={!username || !pass || !matchpass}
                style={formFieldStyle}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Register;
