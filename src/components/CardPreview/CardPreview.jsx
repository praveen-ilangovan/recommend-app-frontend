import Card from 'react-bootstrap/Card';

import placeholderImg from '../../assets/placeholder-image.jpg';

import "./CardPreview.css";

export default function CardPreview({id, title, thumbnail}) {

  const titleLengthLimiter = 21;
  let cardTitle = title;
  if (title.length > titleLengthLimiter) {
    cardTitle = title.slice(0, titleLengthLimiter - 1) + '...';
  }

  const img = thumbnail ? thumbnail : placeholderImg;

  return (
    <Card border="primary" data-toggle="tooltip" data-placement="bottom" title={title}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{id + '.' + cardTitle}</Card.Title>
      </Card.Body>
    </Card>
  );
}
