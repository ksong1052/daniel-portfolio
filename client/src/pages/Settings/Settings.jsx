import './settings.css';
import SideBar from '../../components/SideBar/SideBar';
import Nature5 from '../../images/nature5.jpg';

const Settings = () => {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img 
              src={Nature5} 
              alt="" 
              className="settingsImg" 
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input 
              type="file" 
              id="fileInput" 
              style={{
                display: 'none'
              }} 
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Daneil" />
          <label>Email</label>
          <input type="email" placeholder="ksong1052@gmail.com" />
          <label>Password</label>
          <input type="password" />
          <button className="settingsSubmit">Update</button>
        </form>
      </div>
      <SideBar />      
    </div>
  )
}

export default Settings
