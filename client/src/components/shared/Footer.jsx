import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import "./footer.scss"

function Footer() {
  return (
    <div className='footer-box'>
        
    <ListGroup horizontal>
      <ListGroup.Item><Link to="/About" className="footer-link">About</Link></ListGroup.Item>
      <ListGroup.Item><Link to="/Legal" className="footer-link">Legal</Link></ListGroup.Item>
      <ListGroup.Item><Link to="/Help" className="footer-link">Help</Link></ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default Footer;