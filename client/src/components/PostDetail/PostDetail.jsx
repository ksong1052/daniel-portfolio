import './postDetail.css';
import NatureDetail from '../../images/nature3.jpg';

const PostDetail = () => {
  return (
    <div className="postDetail">
      <div className="postDetailWrapper">
        <img src={NatureDetail} alt="" className="postDetailImg" />
        <h1 className="postDetailTitle">
          Lorem ipsum dolor
          <div className="postDetailEdit">
            <i className="postDetailIcon far fa-edit"></i>
            <i className="postDetailIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="postDetailInfo">
          <span className="postDetailAuthor">Author: <b>Daniel</b></span>
          <span className="postDetailDate">1 hour ago</span>
        </div>
        <p className="postDetailDesc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Non delectus commodi quod iste quaerat eius deserunt tenetur sint? 
          Autem, voluptas. Iste officia molestias modi dicta veritatis dolor. 
          Quia, autem non? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Non delectus commodi quod iste quaerat eius deserunt tenetur sint? 
          Autem, voluptas. Iste officia molestias modi dicta veritatis dolor. 
          Quia, autem non? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Non delectus commodi quod iste quaerat eius deserunt tenetur sint? 
          Autem, voluptas. Iste officia molestias modi dicta veritatis dolor. 
          Quia, autem non?
        </p>
      </div>
    </div>
  )
}

export default PostDetail
