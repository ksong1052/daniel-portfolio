import { useState, useEffect } from "react";
import './sidebar.css';
import SidebarBg from '../../images/sidebar-bg2.jpg';
import axios from "axios";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    }
    getCats();
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={SidebarBg} alt="" className="sidebarImg" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Architecto odio eligendi similique modi a aperiam, molestias veniam quisquam, 
          excepturi fuga omnis maxime perspiciatis dolor deleniti numquam. 
          Velit aspernatur magnam distinctio?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          { categories.map(cat => (
            <Link to={`/?cat=${cat.name}`} className="link">
              <li className="sidebarListItem" key={cat._id}>{cat.name}</li>
            </Link>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>        
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-linkedin"></i>
        </div>
      </div>
    </div>
  )
}

export default SideBar
