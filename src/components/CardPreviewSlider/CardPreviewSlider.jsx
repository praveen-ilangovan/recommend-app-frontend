// React
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';


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

import { AuthContext } from '../../store/AuthContext';
import { getBoard } from '../../api/app';

// Data: Local
import { ROUTE } from '../../constants';

// Component
export default function CardPreviewSlider({boardId}) {

  const {auth} = useContext(AuthContext);
  const cards = [];

  const {data, isSuccess} = useQuery({
    queryKey: ['boards', boardId],
    queryFn: async () => {
      const board = await getBoard(auth.accessToken, boardId);
      return board;
    },
    refetchIntervalInBackground: false
  });

  if (isSuccess) {
    let count = 0;
    for (const card of data?.data?.cards || {}) {
      if (count > 9) {
        break
      }

      cards.push( <div key={card.id}><CardPreview key={card.id} {...card} /></div> )
      count += 1;
    }
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
            {cards}

            {data?.data?.cards.length > 10 ?
              <div> 
                <Card>
                  <Card.Body>
                    <Link to={ROUTE.BOARD.replace(":boardId", boardId)}>
                      Click to see more cards
                    </Link>
                  </Card.Body>
                </Card>
              </div>: <></>
            }

        </Slider>
    </div>
  );
}

CardPreviewSlider.propTypes = {
  boardId: PropTypes.string
};
