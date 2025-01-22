// React
import { useState } from "react";
import PropTypes from "prop-types";

// Components: Project
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";

// Styling: Local
import "./BoardKnobControlPanel.css";

import { useUpdateBoard } from "../../rqhooks/useUpdateBoard";
import { useDeleteBoard } from "../../rqhooks/useDeleteBoard";

// TODO: Form Control width adjustment
// https://stackoverflow.com/questions/64092841/react-how-to-make-an-input-only-as-wide-as-the-amount-of-text-provided

export default function BoardKnobControlPanel({
  boardId,
  boardName,
  isPrivateBoard,
}) {
  // Board properties
  const [name, setName] = useState(boardName);
  const [isPrivate, setPrivate] = useState(isPrivateBoard);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  // ReactQuery
  const { mutateAsync: updateBoard } = useUpdateBoard();
  const { mutateAsync: deleteBoard } = useDeleteBoard(boardId);

  const callUpdateBoard = async (data) => {
    return await updateBoard({
      boardId: boardId,
      data: data,
    });
  };

  // Callbacks
  function editBoardName() {
    setEditValue(name);
    setEditMode(true);
  }

  async function saveBoardName() {
    if (editValue) {
      setName(editValue);
      await callUpdateBoard({ name: editValue });
    }
    setEditMode(false);
  }

  function cancelEdit() {
    setEditValue("");
    setEditMode(false);
  }

  async function onModeChanged() {
    setPrivate(!isPrivate);
    await callUpdateBoard({ private: !isPrivate });
  }

  async function onBoardDelete() {
    return await deleteBoard({
      boardId: boardId,
    });
  }

  return (
    <Container fluid>
      <div className="board-control-panel">
        <div className="board-control-panel-knob">
          <div className={editMode ? "board-control-panel-field-hide" : ""}>
            <Form.Label>{name}</Form.Label>
          </div>
        </div>

        <div className="board-control-panel-knob">
          <div className={editMode ? "" : "board-control-panel-field-hide"}>
            <Form.Control
              size="sm"
              type="text"
              placeholder={name}
              value={editValue}
              onChange={(event) => {
                setEditValue(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="board-control-panel-knob">
          <div className={editMode ? "board-control-panel-field-hide" : ""}>
            <FontAwesomeIcon icon={faEdit} onClick={editBoardName} />
          </div>
        </div>
        <div className="board-control-panel-knob">
          <div className={editMode ? "" : "board-control-panel-field-hide"}>
            <FontAwesomeIcon icon={faSave} onClick={saveBoardName} />
          </div>
        </div>
        <div className="board-control-panel-knob">
          <div className={editMode ? "" : "board-control-panel-field-hide"}>
            <FontAwesomeIcon icon={faXmark} onClick={cancelEdit} />
          </div>
        </div>

        <div className="board-control-panel-spacer" />

        <div className="board-control-panel-knob">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={isPrivate ? "Private" : "Public"}
            onChange={onModeChanged}
            checked={isPrivate}
          />
        </div>

        <div className="board-control-panel-knob">
          <div>
            <FontAwesomeIcon icon={faBan} onClick={onBoardDelete} />
          </div>
        </div>
      </div>
    </Container>
  );
}

BoardKnobControlPanel.propTypes = {
  boardId: PropTypes.string,
  boardName: PropTypes.string,
  isPrivateBoard: PropTypes.bool,
};
