import { useState, useContext } from 'react';
import './write.css';
import axios from 'axios';
import { Context } from '../../context/Context';

const Write = () => {
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);  

  /* 🌟 Important🌟 Uplading image */
  const writeSubmitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        // Uploadinig image to static folder named "images"
        await axios.post("/upload", data);
      } catch(err) {}
    }

    try{
      // Saving image information to DB
      const res = await axios.post("/posts", newPost);
      // Redirect to PostDetail component
      window.location.replace("/post/"+res.data._id);
    } catch(err) {}
  };

  /* 
    URL.createObjectURL : 주어진 객체(File, Blob, MediaSource객체)를 가리키는 URL을 DOMString으로 반환합니다. 
    생성한 값은 현재 창이나, 객체를 생성한 문서 내에서만 유효하다.
    예: const objectURL = URL.createObjectURL(object)
  */
  return (
    <div className="write">
      { file && (
        <img 
          src={URL.createObjectURL(file)} 
          alt="" 
          className="writeImg" 
        />
      )}      
      <form className="writeForm" onSubmit={writeSubmitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            type="file" 
            id="fileInput" 
            style={{display:"none"}} 
            onChange={e => setFile(e.target.files[0])} 
          />
          <input 
            type="text" 
            placeholder="Title" 
            className="writeInput" 
            autoFocus={true} 
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea 
            placeholder="Tell your story..." 
            className="writeInput writeText" 
            type="text"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}

export default Write
