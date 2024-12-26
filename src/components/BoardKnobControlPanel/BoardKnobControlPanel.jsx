// React
import { useState } from 'react';

// Components: Project
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';

// Styling: Local
import './BoardKnobControlPanel.css';


// TODO: Form Control width adjustment
// https://stackoverflow.com/questions/64092841/react-how-to-make-an-input-only-as-wide-as-the-amount-of-text-provided

export default function BoardKnobControlPanel({boardId, boardName, isPrivateBoard}) {

  // Board properties
  const [name, setName] = useState(boardName);
  const [isPrivate, setPrivate] = useState(isPrivateBoard);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  function editBoardName() {
    setEditMode(true);
  }

  function saveBoardName() {
    if (editValue) {
      setName(editValue);
    }
    setEditMode(false);
  }

  function cancelEdit() {
    setEditValue('');
    setEditMode(false);
  }

  function deleteBoard() {
    console.log("Delete board");
  }

  return (
    <Container fluid>
      <div className='board-control-panel'>

        <div className='board-control-panel-knob'>
          <div className={editMode ? 'board-control-panel-field-hide' : ''}>
            <Form.Label>{name}</Form.Label>
          </div>
        </div>

        <div className='board-control-panel-knob'>
          <div className={editMode ? '' : 'board-control-panel-field-hide'}>
            <Form.Control
              size="sm"
              type="text"
              placeholder={name}
              value={editValue}
              onChange={(event) => {setEditValue(event.target.value)}}/>
          </div>
        </div>

        <div className='board-control-panel-knob'>
          <div className={editMode ? 'board-control-panel-field-hide' : ''}>
            <FontAwesomeIcon icon={faEdit} onClick={editBoardName}/>
          </div>
        </div>
        <div className='board-control-panel-knob'>
          <div className={editMode ? '' : 'board-control-panel-field-hide'}>
            <FontAwesomeIcon icon={faSave} onClick={saveBoardName}/>
          </div>
        </div>
        <div className='board-control-panel-knob'>
          <div className={editMode ? '' : 'board-control-panel-field-hide'}>
            <FontAwesomeIcon icon={faXmark} onClick={cancelEdit}/>
          </div>
        </div>

        <div className='board-control-panel-spacer' />
        
        <div className='board-control-panel-knob'>
          <Form.Check type="switch"
            id="custom-switch"
            label={isPrivate ? 'Private' : 'Public'}
            onChange={() => {setPrivate(!isPrivate)}}
          />
        </div>

        <div className='board-control-panel-knob'>
          <div>
            <FontAwesomeIcon icon={faBan} onClick={deleteBoard}/>
          </div>
        </div>

      </div>
    </Container>
  );
}
