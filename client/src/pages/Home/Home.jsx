import { useState, useEffect } from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/SideBar/SideBar";
import axios from "axios";
import { useLocation } from "react-router";

const Home = () => {
  const [ posts, setPosts] = useState([]);

  // const location = useLocation();
  // console.log(location);
  const { search } = useLocation();
  

  // 아래와 같이 axios를 사용할 때, Proxy 설정을 package.json에 설정해 줘야 url을 생략할 수 있다. 
  // "proxy": "http://localhost:5000/api/"
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts"+search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])

  return (
    <>    
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  )
}

export default Home

