import Nav from "react-bootstrap/Nav";
import logo from "../../assets/icon-above-font.svg";
import "./nav.scss"

function NavBar() {
  return (
    <div className="NavContainer">
      <img className="logo" src={logo} alt="Groupomania logo"></img>
      <div className="navList">
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/feed">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2">Log out</Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
    </div>
  );
}

export default NavBar;
