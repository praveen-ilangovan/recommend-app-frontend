// Components: Project
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

// Components: Local
import CardPreviewSlider from "../CardPreviewSlider/CardPreviewSlider";

// Styling: Local
import "./BoardPreview.css";

export default function BoardPreview({name}) {

  function handleClick() {
    console.log("Load the board!!")
  }

  return (
      <section>
          <div>
              <h5 className='inline-block-child'>{name}</h5>
              <div className='inline-block-child'>
                <FontAwesomeIcon className='chevron-icon' icon={faChevronRight} onClick={handleClick}/>
              </div>
          </div>
          <CardPreviewSlider />
      </section>
  );
}
