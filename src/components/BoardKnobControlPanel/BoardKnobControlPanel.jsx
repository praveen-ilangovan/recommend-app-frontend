// React
import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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

import { AuthContext } from '../../store/AuthContext';
import { updateBoard, deleteBoard } from '../../api/app';
import { ROUTE } from '../../constants';


// TODO: Form Control width adjustment
// https://stackoverflow.com/questions/64092841/react-how-to-make-an-input-only-as-wide-as-the-amount-of-text-provided

export default function BoardKnobControlPanel({boardId, boardName, isPrivateBoard}) {

  const {auth} = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Board properties
  const [name, setName] = useState(boardName);
  const [isPrivate, setPrivate] = useState(isPrivateBoard);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  // ReactQuery
  const {mutateAsync} = useMutation({
    mutationFn: updateBoard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
    },
    onError(error) {
      console.log("Failed to log in", error)
    }
  });

  const redirect = useNavigate();
  const {mutateAsync:deleteBoardAsync} = useMutation({
    mutationFn: deleteBoard,
    retry: false,
    onSuccess() {
      // These queryClient calls doesn't seem to do much
      queryClient.removeQueries({queryKey: ['boards', boardId], exact: true})
      queryClient.invalidateQueries({ queryKey: ['me', auth.userId] })
      redirect(ROUTE.HOME);
    },
    onError(error) {
      console.log("Failed to log in", error)
    }
  });

  const callUpdateBoard = async (data) => {
    console.log(boardId);
    return await mutateAsync( {
      accessToken: auth.accessToken,
      boardId: boardId,
      data: data} )
  }

  
  // Callbacks
  function editBoardName() {
    setEditValue(name);
    setEditMode(true);
  }

  async function saveBoardName() {
    if (editValue) {
      setName(editValue);
      await callUpdateBoard({name: editValue})
    }
    setEditMode(false);
  }

  function cancelEdit() {
    setEditValue('');
    setEditMode(false);
  }

  async function onModeChanged() {
    setPrivate(!isPrivate);
    await callUpdateBoard({private: !isPrivate})
  }

  async function onBoardDelete() {
    console.log("Delete board");
    return await deleteBoardAsync( {
      accessToken: auth.accessToken,
      boardId: boardId} )
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
            onChange={onModeChanged}
            checked={isPrivate}
          />
        </div>

        <div className='board-control-panel-knob'>
          <div>
            <FontAwesomeIcon icon={faBan} onClick={onBoardDelete}/>
          </div>
        </div>

      </div>
    </Container>
  );
}

BoardKnobControlPanel.propTypes = {
  boardId: PropTypes.string,
  boardName: PropTypes.string,
  isPrivateBoard: PropTypes.bool
};
