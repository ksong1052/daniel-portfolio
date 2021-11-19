import { useEffect, useState, useContext } from "react";
import './postDetail.css';
import { useLocation } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';

const PostDetail = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const imageUrl = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path])  

  const deleteHandler = async () => {
    try {      
      await axios.delete("/posts/" + path, {
        data: {username: user.username}
      });
      window.location.replace("/");
    } catch(err) {}
    
  };

  const updateHandler = async () => {
    try {      
      await axios.put("/posts/" + path, {
        username: user.username, 
        title, 
        desc
      });

      // window.location.reload() : 
      // 현재 웹페이지를 다시 불러오게 하는 것입니다. 키보드의 F5키를 눌러 브라우저를 "새로 고침"하는 것과 같습니다. 
      //window.location.reload();
      
      setUpdateMode(false);
    } catch(err) {}
  }

  const cancelHandler = () => {
    //window.location.reload();
    setUpdateMode(false);
  }

  return (
    <div className="postDetail">
      <div className="postDetailWrapper">
        { post.photo && (
          <img src={imageUrl + post.photo} alt="" className="postDetailImg" />          
        )}
        {
          updateMode ? 
            <input 
            type="text" 
            value={title} 
            className="postDetailTitleEdit" 
            autoFocus  
            onChange={(e) => setTitle(e.target.value)}
          /> : (
            <h1 className="postDetailTitle">
              {title}
              {post.username === user?.username && (
                <div className="postDetailEdit">
                  <i className="postDetailIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                  <i className="postDetailIcon far fa-trash-alt" onClick={deleteHandler}></i>
                </div>
              )}
            </h1>
          )
        }
        
        <div className="postDetailInfo">
          <span className="postDetailAuthor">Author: 
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>    
          <span className="postDetailDate">{new Date(post.createdAt).toDateString()}</span>
        </div>     
        {
          updateMode ? 
            <textarea 
              className="postDetailDescEdit" 
              value={desc}  
              onChange={(e) => setDesc(e.target.value)}
            /> : (
            <p className="postDetailDesc">
              {desc}
            </p>
          )
        }    
        { updateMode && 
          ( 
            <div className="postDetailButtonGroup">
              <button className="postDetailButton" onClick={updateHandler}>Update</button> 
              <button className="postDetailButton" onClick={cancelHandler}>Cancel</button>
            </div> 
          )            
        }
         
      </div>
    </div>
  )
}

export default PostDetail
