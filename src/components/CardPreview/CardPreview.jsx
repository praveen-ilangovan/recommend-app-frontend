// React
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components: Project
import Card from 'react-bootstrap/Card';

// Styling: Local
import "./CardPreview.css";

// Data: Local
import placeholderImg from '../../assets/img/placeholder-image.jpg';
import { ROUTE } from '../../constants';

export default function CardPreview({id, title='', thumbnail=''}) {

  // Trim the title
  const titleLengthLimiter = 30;
  let cardTitle = title;
  if (title.length > titleLengthLimiter) {
    cardTitle = title.slice(0, titleLengthLimiter - 1) + '...';
  }

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  return (
    <Link to={ROUTE.CARD.replace(":cardId", id)}>
      <Card className='card-preview' data-toggle="tooltip" data-placement="bottom" title={title}>
          <Card.Img className='card-preview-img' variant="top" src={img} />
          <Card.Body>
            <Card.Title className='card-preview-title'>{cardTitle}</Card.Title>
          </Card.Body>
      </Card>
    </Link>
  );
}

CardPreview.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string
};
