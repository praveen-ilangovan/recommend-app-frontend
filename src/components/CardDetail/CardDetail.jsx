// Components: Project
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

// Styling: Local
import "./CardDetail.css";

// Data: Local
import placeholderImg from '../../assets/placeholder-image.jpg';

export default function CardDetail({title, description, thumbnail, url, id, editable=false}) {

  function editCard() {
    console.log(id);
  }

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <div className='control-panel'>
          <div>
            <FontAwesomeIcon icon={faEdit} className={editable ? 'knob' : 'hide'} onClick={editCard}/>
          </div>

          <a href={url} target="_blank" rel="noopener noreferrer" className='knob'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
