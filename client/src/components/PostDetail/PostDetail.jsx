import { useEffect, useState } from "react";
import './postDetail.css';
import { useLocation } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
    }
    getPost();
  }, [path])

  const imageurl = "http://localhost:5000/images/";

  return (
    <div className="postDetail">
      <div className="postDetailWrapper">
        { post.photo && (
          <img src={imageurl+post.photo} alt="" className="postDetailImg" />          
        )}
        <h1 className="postDetailTitle">
          {post.title}
          <div className="postDetailEdit">
            <i className="postDetailIcon far fa-edit"></i>
            <i className="postDetailIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="postDetailInfo">
          <span className="postDetailAuthor">Author: 
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="postDetailDate">{new Date(post.createdAt).toDateString()}</span>
        </div>                             
        <p className="postDetailDesc">
          {post.desc}
        </p>
      </div>
    </div>
  )
}

export default PostDetail
