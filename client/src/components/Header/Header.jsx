import "./header.css";
import headerBg from '../../images/header-bg.jpg';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img src={headerBg} alt="" className="headerImg" />
    </div>
  )
}
