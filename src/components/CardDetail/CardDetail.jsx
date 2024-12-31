// React
import { useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Components: Project
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../store/AuthContext';
import { deleteCard } from '../../api/app';

// Styling: Local
import "./CardDetail.css";

// Data: Local
import { ROUTE } from '../../constants';
import placeholderImg from '../../assets/img/placeholder-image.jpg';

export default function CardDetail({id, url, title, thumbnail, description, board_id, editable=false, onEdit}) {

  const {auth} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const redirect = useNavigate();

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  // ReactQuery
  const {mutateAsync:deleteCardAsync, error:deleteCardError} = useMutation({
    mutationFn: deleteCard,
    retry: false,
    onSuccess(data) {
      // These queryClient calls doesn't seem to do much
      queryClient.removeQueries({queryKey: ['cards', id]})
      queryClient.invalidateQueries({ queryKey: ['boards', board_id] })
      queryClient.invalidateQueries({ queryKey: ['me', auth.userId] })
      redirect(ROUTE.BOARD.replace(":boardId", board_id));
    },
    onError(error) {
      console.log("Failed to log in", error)
    }
  });

  // Callback
  const editClicked = () => {
    if (onEdit) {
      onEdit();
    }
  }

  const onDeleteClicked = async () => {
    return await deleteCardAsync( {
      accessToken: auth.accessToken,
      cardId: id} )
  }

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <div className='control-panel'>
          <div>
            <FontAwesomeIcon icon={faEdit} className={editable ? 'knob' : 'hide'} onClick={onEdit}/>
            <FontAwesomeIcon icon={faBan} className={editable ? 'knob' : 'hide'} onClick={onDeleteClicked}/>
          </div>

          <a href={url} target="_blank" rel="noopener noreferrer" className='knob'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
