import Slider from 'react-slick';

import CardPreview from '../CardPreview/CardPreview';


// Styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './CardPreviewSlider.css';

import { CARDS } from '../../../data';

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
