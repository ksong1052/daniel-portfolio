import { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  // Sending User information to server
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });      
      
      res.data && window.location.replace("/login");
    } catch(err) {
      //console.error(err.response.data.message);
      
      // ⭐ Important ⭐ How to get the error message of express-validator in Node
      setErrorMessage(err.response.data.message);   
    }

  };

  return (
    <div className="register">   
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <label>Username</label>
        <input 
          type="text" 
          className="registerInput" 
          placeholder="Enter your username.." 
          onChange={e => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input 
          type="email" 
          className="registerInput" 
          placeholder="Enter your email.." 
          onChange={e => setEmail(e.target.value)}  
        />
        <label>Password</label>
        <input 
          type="password" 
          className="registerInput" 
          placeholder="Enter your password.." 
          onChange={e => setPassword(e.target.value)}  
        />        
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
      </button>       
      { 
        errorMessage && <span style={{color:"red",marginTop:"10px"}}>{errorMessage}</span>   
      }      
    </div>
  )
}

export default Register
