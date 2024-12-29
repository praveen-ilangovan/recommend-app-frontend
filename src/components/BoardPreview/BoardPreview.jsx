// React
import { Link } from 'react-router-dom';

// Components: Project
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

// Components: Local
import CardPreviewSlider from "../CardPreviewSlider/CardPreviewSlider";

// Styling: Local
import "./BoardPreview.css";

// Data
import { BOARDS } from '../../../data';
import { ROUTE } from '../../constants';

export default function BoardPreview({boardId}) {

  function getBoardName() {
    for (const [id, board] of Object.entries(BOARDS)) {
      if (id === boardId) {
        return board.name;
      }
    }
  }
  const name = getBoardName();

  return (
      <div>
          <div>
              <h5 className='inline-block-child'>{name}</h5>
              <div className='inline-block-child'>
                <Link to={ROUTE.BOARD.replace(":boardId", boardId)}>
                  <FontAwesomeIcon className='chevron-icon' icon={faChevronRight}/>
                </Link>
              </div>
          </div>
          <div>
            <CardPreviewSlider boardId={boardId} />
          </div>
      </div>
  );
}
