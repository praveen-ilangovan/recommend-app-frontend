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

export default function BoardKnobControlPanel({name, privateBoard}) {

  // Board properties
  const [boardName, setBoardName] = useState(name);
  const [isPrivate, setPrivate] = useState(privateBoard);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  function editBoardName() {
    setEditMode(true);
  }

  function saveBoardName() {
    if (editValue) {
      setBoardName(editValue);
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
      <div className='control-panel'>

        <div className='knob'>
          <div className={editMode ? 'hide' : ''}>
          <Form.Label>{boardName}</Form.Label>
          </div>
        </div>

        <div className='knob'>
          <div className={editMode ? '' : 'hide'}>
            <Form.Control
              size="sm"
              type="text"
              placeholder={boardName}
              value={editValue}
              onChange={(event) => {setEditValue(event.target.value)}}/>
          </div>
        </div>

        <div className='knob'>
          <div className={editMode ? 'hide' : ''}>
            <FontAwesomeIcon icon={faEdit} onClick={editBoardName}/>
          </div>
        </div>
        <div className='knob'>
          <div className={editMode ? '' : 'hide'}>
            <FontAwesomeIcon icon={faSave} onClick={saveBoardName}/>
          </div>
        </div>
        <div className='knob'>
          <div className={editMode ? '' : 'hide'}>
            <FontAwesomeIcon icon={faXmark} onClick={cancelEdit}/>
          </div>
        </div>

        <div className='spacer' />
        
        <div className='knob'>
          <Form.Check type="switch"
            id="custom-switch"
            label={isPrivate ? 'Private' : 'Public'}
            onChange={() => {setPrivate(!isPrivate)}}
          />
        </div>

        <div className='knob'>
          <div>
            <FontAwesomeIcon icon={faBan} onClick={deleteBoard}/>
          </div>
        </div>

      </div>
    </Container>
  );
}
