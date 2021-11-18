import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';
import axios from 'axios';

const Login = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const { dispatch, isFetching } = useContext(Context);


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch(err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }

  return (
    <div className="login">   
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={onSubmitHandler}>
        <label>Username</label>
        <input 
          type="text" 
          className="loginInput" 
          placeholder="Enter your username.." 
          ref={usernameRef}  
        />
        <label>Password</label>
        <input 
          type="password" 
          className="loginInput" 
          placeholder="Enter your password.." 
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>        
      </form>  
      <button className="loginRegisterButton">
        <Link to="/register" className="link">Register</Link>
      </button>     
    </div>
  )
}

export default Login
