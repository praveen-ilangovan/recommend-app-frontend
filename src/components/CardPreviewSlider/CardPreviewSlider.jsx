// React
import { Link } from 'react-router-dom';

// Components: Project
import Slider from 'react-slick';
import Card from 'react-bootstrap/Card';

// Components: Local
import CardPreview from '../CardPreview/CardPreview';

// Styling: Project
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styling: Local
import './CardPreviewSlider.css';

// Data: Local
import { BOARDS, CAARDS } from '../../../data';
import { ROUTE } from '../../constants';

// Component
export default function CardPreviewSlider({boardId}) {

  const cards = [];

  function populateCards() {
    for (const [id, board] of Object.entries(BOARDS)) {
      if (id === boardId) {
        let count = 0;
        for (const cardId of board.cards) {
          if (count > 9) {
            break;
          }
          const card = CAARDS[cardId];
          cards.push( <div key={cardId}><CardPreview key={cardId} {...card} /></div> );
          count += 1;
        }
        break;
      }
    }
  }

  populateCards();

  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="image-slider-container">
        <Slider {...settings}>
            {cards}

            <div data-toggle="tooltip" data-placement="bottom" title="Click to see all the cards">
              <Card>
                <Card.Body>
                  <Link to={ROUTE.BOARD.replace(":boardId", boardId)}>
                    Click to see more cards
                  </Link>
                </Card.Body>
              </Card>
            </div>
        </Slider>
    </div>
  );
}
