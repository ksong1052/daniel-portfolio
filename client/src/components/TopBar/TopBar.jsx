import { useContext } from 'react';
import { Context } from "../../context/Context";
import "./topbar.css";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>        
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-linkedin"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">HOME</Link>
          </li>
          <li className="topListItem"><Link to="/about" className="link">ABOUT</Link></li>
          <li className="topListItem"><Link to="/contactt" className="link">CONTACT</Link></li>
          <li className="topListItem"><Link to="/write" className="link">{ user ? "WRITE" : ""} </Link></li>
          <li className="topListItem" onClick={logoutHandler}>
            { user && "LOGOUT"}  
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <img src={user.profilePic} alt="" className="topImg" />
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/register" className="link">
                  REGISTER
                </Link>
              </li>  
            </ul>
          )
        }
        <i className="topSearchIcon fas fa-search"></i>       
      </div>
    </div>
  )
}

export default TopBar
