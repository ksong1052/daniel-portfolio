import './write.css';
import Nature from '../../images/nature4.jpg';

const Write = () => {
  return (
    <div className="write">
      <img 
        src={Nature} 
        alt="" 
        className="writeImg" 
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{display:"none"}} />
          <input type="text" placeholder="Title" className="writeInput" autoFocus={true} />
        </div>
        <div className="writeFormGroup">
          <textarea 
            placeholder="Tell your story..." 
            className="writeInput writeText" 
            type="text"
          ></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  )
}

export default Write
