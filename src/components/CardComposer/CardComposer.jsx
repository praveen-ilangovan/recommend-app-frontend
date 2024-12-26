// React
import { useState } from 'react';

// Components: Project
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import CardForm from '../CardForm/CardForm';
import CardDetail from '../CardDetail/CardDetail';
import CardPreview from '../CardPreview/CardPreview';

export default function CardComposer({id, url, thumbnail, title="Title", description="Description..."}) {
  // Default value
  const defaultCardData = {
    "url": url,
    "title": title,
    "thumbnail": thumbnail,
    "description": description};

  // states
  const [cardData, setCardData] = useState(defaultCardData);

  function updateCardData(values) {
    if (values === null) {
      setCardData(defaultCardData);
    } else {
      const updataData = {...cardData, ...values};
      setCardData(updataData);
    }
  }

  return (
      <Container fluid className='recommend-page-container'>
        <Row className='recommend-grid-row'>
          <Col md={6} className='recommend-grid-col'>
            <div className='shadow recommend-form-box'>
              <div className='recommend-form-header'>
                <h3>Compose the card</h3>
              </div>
              <div>
                <CardForm
                  id={id}
                  url={url}
                  title={title}
                  description={description}
                  thumbnail={thumbnail}
                  onUpdate={updateCardData} />
              </div>
            </div>
          </Col>

          <Col className='recommend-grid-col'>
            <div className='recommend-form-header'>
              <h5>Preview</h5>
            </div>
            <CardPreview id={id} title={cardData.title} thumbnail={cardData.thumbnail} />
          </Col>
  
          <Col className='recommend-grid-col'>
            <div className='recommend-form-header'>
              <h5>Final</h5>
            </div>
            <CardDetail {...cardData} />
          </Col>

        </Row>
    </Container>
  );
}
