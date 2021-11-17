import './single.css';
import SideBar from '../../components/SideBar/SideBar';
import PostDetail from '../../components/PostDetail/PostDetail';

export default function Single() {
  return (
    <div className="single">
      <PostDetail />
      <SideBar />
    </div>
  )
}
