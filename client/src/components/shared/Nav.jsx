import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/icon-above-font.svg";
import "./nav.scss";

function NavBar() {
  return (
    <div className="page-header">
    <div className="nav-container">
      <div className="logo-box">
        <img className="logo" src={logo} alt="Groupomania logo"></img>
      </div>
      <div className="navList">
      <Nav
      activeKey="/PostsList"
    >
      <Nav.Item>
        <Link to="/PostsList" className="nav-link">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/Profile" className="nav-link">Profile</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/" className="nav-link">Log out</Link>
      </Nav.Item>
    </Nav>
      </div>
    </div>
    <hr className="solid"></hr>
    </div>
  );
}

export default NavBar;
