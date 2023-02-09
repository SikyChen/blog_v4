import { Link } from "react-router-dom";
import './style.css';

function Menu() {

  return (
    <div className="menu">
      <Link to="/" className="logo">SIKY BLOG</Link>
      {/* <Link to="/">首页</Link> */}
    </div>
  )
}

export default Menu;
