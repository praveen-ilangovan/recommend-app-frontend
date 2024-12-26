// React
import { Link } from 'react-router-dom';

// Components: Project
import Card from 'react-bootstrap/Card';

// Styling: Local
import "./CardPreview.css";

// Data: Local
import placeholderImg from '../../assets/placeholder-image.jpg';

export default function CardPreview({id, title, thumbnail}) {

  // Trim the title
  const titleLengthLimiter = 36;
  let cardTitle = title;
  if (title.length > titleLengthLimiter) {
    cardTitle = title.slice(0, titleLengthLimiter - 1) + '...';
  }

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  return (
    <Link to={`/cards/${id}`}>
      <Card className='card-preview' data-toggle="tooltip" data-placement="bottom" title={title}>
          <Card.Img className='card-preview-img' variant="top" src={img} />
          <Card.Body>
            <Card.Title className='card-preview-title'>{cardTitle}</Card.Title>
          </Card.Body>
      </Card>
    </Link>
  );
}
