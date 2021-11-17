import './sidebar.css';
import SidebarBg from '../../images/sidebar-bg2.jpg';

const SideBar = () => {
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
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Cinema</li>
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
