import React, { useState } from "react";
import axios from 'axios'

// can delegate to utils file later if we want to
function createUser(email, password) {
  let data = JSON.stringify({
    "username": email,
    "password": password
  });
  
  let config = {
    method: 'post',
    url: 'https://api-m46o.onrender.com/user',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data)); // success?
  })
  .catch((error) => {
    console.log(error);
  });
}

const PASSWORD_REQ = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
  //Modifies the state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [validPassword, setValidPassword] = useState(""); // TO DO

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();

    if (pass != matchpass) console.log('passwords do not match'); // replace with UI element later
    else {
      createUser(email, pass);
    }
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
        <label for="password">Password</label>
        <input
          value={matchpass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={(e) => setMatchpass(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
