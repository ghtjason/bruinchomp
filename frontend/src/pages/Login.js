import React, { useState } from "react";
import axios from 'axios'

const Login = () => {
  //Modifies the state
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();
    console.log(email);
    console.log(pass);

    // can split into utils file later
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
      console.log(JSON.stringify(response.data)); // auth token
    })
    .catch((error) => {
      console.log(error);
    });


  };
  return (
    //Placeholder is what is displayed in input before they type
    //Label is the tags displayed ontop of the tags itself
    //Button type = submit it will fire handleSubmit function
    <>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          type="email"
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
    </>
  );
};

export default Login;
