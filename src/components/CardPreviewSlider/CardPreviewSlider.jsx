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
import { CARDS } from '../../../data';

// Component
export default function CardPreviewSlider() {

  function handleClick() {
    console.log("Load the board!!")
  }

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
            {CARDS.map( (card) => <div key={card.id}><CardPreview key={card.id} {...card} /></div> )}

            <div data-toggle="tooltip" data-placement="bottom" title="Click to see all the cards">
              <Card onClick={handleClick}>
                <Card.Body>Click to see more cards</Card.Body>
              </Card>
            </div>
        </Slider>
    </div>
  );
}
