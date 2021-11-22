import "./header.css";
import headerBg from '../../images/header-bg.jpg';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm"><h1><i>Daniel's</i></h1></span>
        <br />
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img src={headerBg} alt="" className="headerImg" />
    </div>
  )
}
