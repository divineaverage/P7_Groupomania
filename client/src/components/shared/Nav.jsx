import Nav from "react-bootstrap/Nav";
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
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/feed">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/">Log out</Nav.Link>
      </Nav.Item>
    </Nav>
      </div>
    </div>
    <hr className="solid"></hr>
    </div>
  );
}

export default NavBar;
