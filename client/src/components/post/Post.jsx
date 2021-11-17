import './post.css';
import Nature from '../../images/nature2.jpg';

const Post = () => {
  return (
    <div className="post">
      <img src={Nature} alt="" className="postImg" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">
          Lorem ipsum dolor sit amet consectetur. 
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Numquam maxime, ad mollitia ipsum in, molestiae sapiente, 
        cupiditate alias fugit quam nam ut consectetur iste odit 
        quisquam laborum porro neque. Iste!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Numquam maxime, ad mollitia ipsum in, molestiae sapiente, 
        cupiditate alias fugit quam nam ut consectetur iste odit 
        quisquam laborum porro neque. Iste!
      </p>
    </div>
  )
}

export default Post
