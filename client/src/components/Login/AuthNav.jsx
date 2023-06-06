import logo from "../../assets/icon-above-font.svg";
import "../shared/nav.scss";

function NavBar() {
  return (
    <div className="page-header">
    <div className="nav-container">
      <div className="logo-box">
        <img className="logo" src={logo} alt="Groupomania logo"></img>
      </div>
      <div className="navList">
      </div>
    </div>
    <hr className="solid"></hr>
    </div>
  );
}

export default NavBar;
