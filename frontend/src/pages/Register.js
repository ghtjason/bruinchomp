import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie"; // cookiessssss
import { useNavigate } from "react-router-dom";

const PASSWORD_REQ = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
  const navigate = useNavigate();
  //Modifies the state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();

    setMessage("Processing...");

    if (pass != matchpass) {
      setMessage("Passwords do not match!");
      console.log("passwords do not match"); // replace with UI element later
    } else createUser(email, pass);
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // remove authToken cookie
    window.location.reload(); // reload the page
  };

  // can delegate to utils file later if we want to
  function createUser(email, password) {
    let data = JSON.stringify({
      username: email,
      password: password,
    });

    let config = {
      method: "post",
      url: "https://api-m46o.onrender.com/users",
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
            setMessage("Username must not include spaces");
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
  // if user is logged in:
  if (authToken) {
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
    return (
      <div style={loginContainerStyle}>
        <Card style={cardStyle}>
          <CardContent>
            <h2>Create Account</h2>
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
              <TextField
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
                style={formFieldStyle}
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
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
