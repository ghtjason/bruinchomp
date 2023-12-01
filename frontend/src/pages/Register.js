import React, { useState } from "react";

const PASSWORD_REQ = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
  //Modifies the state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [matchpass, setMatchpass] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const handleSubmit = (e) => {
    //Prevent reloading the page
    e.preventDefault();
    console.log(email);
    console.log(pass);
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
        />
        <label for="password">Password</label>
        <input
          value={pass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <label for="password">Password</label>
        <input
          value={matchpass}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
      <button>Signup here</button>
    </>
  );
};

export default Register;
