// Components: Project
import Slider from 'react-slick';

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
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };
  return (
    <div className="image-slider-container">
        <Slider {...settings}>
            {CARDS.map( (card) => <div><CardPreview key={card.id} {...card} /></div> )}
        </Slider>
    </div>
  );
}
