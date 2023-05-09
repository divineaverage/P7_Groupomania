import ListGroup from 'react-bootstrap/ListGroup';
import "./footer.scss"

function Footer() {
  return (
    <div className='footer-box'>
        <hr className="solid"></hr>
    <ListGroup horizontal>
      <ListGroup.Item>This</ListGroup.Item>
      <ListGroup.Item>ListGroup</ListGroup.Item>
      <ListGroup.Item>renders</ListGroup.Item>
      <ListGroup.Item>horizontally!</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default Footer;