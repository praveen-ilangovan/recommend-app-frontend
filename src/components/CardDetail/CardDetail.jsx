// Components: Project
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

// Styling: Local
import "./CardDetail.css";

// Data: Local
import placeholderImg from '../../assets/img/placeholder-image.jpg';

export default function CardDetail({id, url, title, thumbnail, description, board_id, editable=false, onEdit}) {

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  // Callback
  const editClicked = () => {
    if (onEdit) {
      onEdit();
    }
  }

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
            <FontAwesomeIcon icon={faEdit} className={editable ? 'knob' : 'hide'} onClick={onEdit}/>
          </div>

          <a href={url} target="_blank" rel="noopener noreferrer" className='knob'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
