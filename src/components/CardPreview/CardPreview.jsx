import Card from 'react-bootstrap/Card';

import "./CardPreview.css";

export default function CardPreview({id, title, thumbnail}) {

  const titleLengthLimiter = 21;
  let cardTitle = title;
  if (title.length > titleLengthLimiter) {
    cardTitle = title.slice(0, titleLengthLimiter - 1) + '...';
  }

  return (
    <Card border="primary" data-toggle="tooltip" data-placement="bottom" title={title}>
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
      </Card.Body>
    </Card>
  );
}
