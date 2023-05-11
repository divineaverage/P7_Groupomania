import ListGroup from 'react-bootstrap/ListGroup';
import "./footer.scss"

function Footer() {
  return (
    <div className='footer-box'>
        <hr className="solid"></hr>
    <ListGroup horizontal>
      <ListGroup.Item>About</ListGroup.Item>
      <ListGroup.Item>Legal</ListGroup.Item>
      <ListGroup.Item>Help</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default Footer;