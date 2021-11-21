import { useContext, useState, useEffect } from 'react';
import './settings.css';
import SideBar from '../../components/SideBar/SideBar';
import { Context } from '../../context/Context';
import axios from 'axios';

const Settings = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  //const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const imageUrl = "http://localhost:5000/images/";

  useEffect( () => {
    const getUser = async () => {
      const res = await axios.get("/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setProfilePic(res.data.profilePic);
    }
    getUser();
  }, [user._id]);

  /* 🌟 Important🌟 Uplading image */
  const settingsSubmitHandler = async (e) => {
    e.preventDefault();  

    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        // Uploadinig image to static folder named "images"
        await axios.post("/upload", data);        
      } catch(err) {
        console.log("Something wrong with uploading image..!!");
      }
    }

    try{
      // Modified user information and Save it to DB
      const res = await axios.put("/users/" + user._id, updatedUser);   
      if(res.data) {        
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        alert("Profile has been updated...!!");

        window.location.replace("/settings");
        //setSuccess(true); 
        setUpdateMode(false);
      } else { console.log("Something wrong with updating profile..!!");}
            
    } catch(err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();    
    setUpdateMode(true);    
  }

  const cancelHandler = (e) => {
    e.preventDefault();    
    // setSuccess(false);
    // window.location.replace("/");
    //setSuccess(false);
    setUpdateMode(false);
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/* <span className="settingsDeleteTitle">Delete Account</span> */}
        </div>
        <form 
          className="settingsForm"
          onSubmit={settingsSubmitHandler}
        >
          <label>Profile Picture</label>
          {
            updateMode ?
            <>              
              <div className="settingsPP">                                 
                { file ? 
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="" 
                    className="settingsImg" 
                  />
                  :
                  <img 
                    src={imageUrl + profilePic} 
                    alt="" 
                    className="settingsImg" 
                  />                
                } 
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input 
                  type="file" 
                  id="fileInput" 
                  style={{
                    display: 'none'
                  }} 
                  onChange={e => setFile(e.target.files[0])}
                />
              </div>
              <label>Username</label>
              <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
              <label>Email</label>
              <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
              <label>Password</label>
              <input type="password" placeholder={user.password} onChange={e => setPassword(e.target.value)} />

              <div className="settingsSubmitGroup">
                <button className="settingsSubmit" type="submit">Update</button> 
                <button className="settingsSubmit" onClick={cancelHandler}>Cancel</button> 
              </div>                             
            </> 
            : 
            <>
              <div className="settingsPP">
                <img 
                  src={imageUrl + profilePic} 
                  alt="" 
                  className="settingsImg" 
                />             
              </div>
              <label>Username</label>
              <input type="text" value={username} readOnly />
              <label>Email</label>
              <input type="email" value={email} readOnly />
              <label>Password</label>
              <input type="password" value={password} readOnly />

              <div className="settingsSubmitGroup">
                <button className="settingsSubmit" onClick={updateHandler}>Edit</button>
              </div>
            </> 
          }          
        </form>
        {/* {
          success && <span style={{color:"green", textAlign:"center"}} className="settingsSuccess">
            Profile has been updated...!!
          </span>
        } */}
      </div>       
      <SideBar />      
    </div>
  )
}

export default Settings


  