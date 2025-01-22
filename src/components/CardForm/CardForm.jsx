// React
import { useState, useContext } from "react";
import PropTypes from "prop-types";

// Components: Project
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useFormikContext, Formik } from "formik";
import * as yup from "yup";

import { AuthContext } from "../../store/AuthContext";

import { useGetLoggedInUserData } from "../../rqhooks/useGetLoggedInUserData";
import { useCreateBoard } from "../../rqhooks/useCreateBoard";
import { useCreateCard } from "../../rqhooks/useCreateCard";
import { useScrapper } from "../../rqhooks/useScrapper";

import "./CardForm.css";

export default function CardForm({ card, onUpdate }) {
  // Validation schema
  const schema = yup.object().shape({
    url: yup.string().url().required(),
    title: yup.string().required(),
    thumbnail: yup.string().url(),
    description: yup.string(),
    selectedBoardId: yup.string(),
    boardType: yup.string(),
    boardName: yup.string(),
  });

  // Get the boards and find the initial board value!
  const { auth } = useContext(AuthContext);
  let firstBoard = "";
  const availableBoards = [];

  // Get user data
  const { data: userData, isSuccess: gotUserData } = useGetLoggedInUserData();
  if (gotUserData) {
    if (userData?.boards) {
      for (const board of userData?.boards || {}) {
        availableBoards.push({ id: board.id, name: board.name });
      }
      firstBoard = userData?.boards[0].id;
    }
  }

  // Create board
  const { mutateAsync: createBoard } = useCreateBoard();

  // Create card
  const { mutateAsync: createCard } = useCreateCard();

  // Callback
  async function onSubmit(values) {
    let boardId = values.selectedBoardId;

    if (values.boardType === "create") {
      const board = await createBoard({
        data: { name: values.boardName, private: false },
      });

      if (board?.status === 201 && board?.data) {
        boardId = board.data.id;
      }
    }

    if (boardId) {
      return await createCard({
        boardId: boardId,
        data: {
          url: values.url,
          title: values.title,
          thumbnail: values.thumbnail,
          description: values.description,
        },
      });
    }
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        url: card.url,
        title: card.title,
        thumbnail: card.thumbnail,
        description: card.description,
        selectedBoardId: firstBoard,
        boardType: "select",
        boardName: "",
      }}
    >
      <ActualForm availableBoards={availableBoards} onUpdate={onUpdate} />
    </Formik>
  );
}

// Actual Form Component
function ActualForm({ availableBoards, onUpdate }) {
  const selectBoardOptions = [];
  const [showSelectBoardField, setShowSelectBoardField] = useState(true);
  const { auth } = useContext(AuthContext);
  const formikProps = useFormikContext();

  // Mutation
  const { mutateAsync: scrapData } = useScrapper();

  function handleUpdate(updatedData) {
    if (onUpdate) {
      onUpdate(updatedData);
    }
  }

  function handleOnChange(event, formikHandleChange) {
    // Handle the in
    formikHandleChange(event);

    if (
      !["url", "title", "description", "thumbnail"].includes(event.target.name)
    ) {
      return;
    }

    // Hack to initialise the selectedBoardId value with the first item in the list
    // If not, it will be an empty string
    if (
      event.target.name == "url" &&
      formikProps.values.selectedBoardId === "" &&
      availableBoards &&
      availableBoards.length
    ) {
      formikProps.setFieldValue("selectedBoardId", availableBoards[0].id);
    }

    // Callback
    const updatedData = {};
    updatedData[event.target.name] = event.target.value;
    handleUpdate(updatedData);
  }

  function onBoardTypeChange(event, formikHandleChange) {
    // Handle the in
    formikHandleChange(event);
    setShowSelectBoardField(event.target.value === "select");
  }

  async function extract() {
    const data = await scrapData(formikProps.values.url);

    if (!data?.data) {
      return;
    }

    formikProps.setFieldValue("url", data.data.url);
    formikProps.setFieldValue("title", data.data.title);
    formikProps.setFieldValue("thumbnail", data.data.thumbnail, true);
    formikProps.setFieldValue("description", data.data.description);

    // Call the update
    const updatedData = {
      url: data.data.url,
      title: data.data.title,
      thumbnail: data.data.thumbnail,
      description: data.data.description,
    };
    handleUpdate(updatedData);
  }

  function clearForm() {
    formikProps.resetForm();
    handleUpdate(null);
  }

  // Populate the options
  for (const op of availableBoards) {
    selectBoardOptions.push(
      <option key={op.id} value={op.id}>
        {op.name}
      </option>,
    );
  }

  return (
    <Form noValidate onSubmit={formikProps.handleSubmit}>
      <Form.Group
        md="6"
        controlId="cardForm-urlField"
        className="recommend-form-field-group"
      >
        <Form.Label>Url *</Form.Label>

        <InputGroup className="mb-3">
          <Form.Control
            size="sm"
            type="url"
            placeholder="Enter the url"
            name="url"
            value={formikProps.values.url}
            onChange={(event) => {
              handleOnChange(event, formikProps.handleChange);
            }}
            isInvalid={formikProps.touched.url && !!formikProps.errors.url}
          />
          <Button
            size="sm"
            variant="outline-primary"
            id="cardForm-extractButton"
            onClick={extract}
          >
            Extract
          </Button>
        </InputGroup>

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.url}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="3"
        controlId="cardForm-titleField"
        className="recommend-form-field-group"
      >
        <Form.Label>Title *</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder="Title of the card"
          name="title"
          value={formikProps.values.title}
          onChange={(event) => {
            handleOnChange(event, formikProps.handleChange);
          }}
          isInvalid={formikProps.touched.title && !!formikProps.errors.title}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="3"
        controlId="cardForm-imageField"
        className="recommend-form-field-group"
      >
        <Form.Label>Image</Form.Label>
        <Form.Control
          size="sm"
          type="url"
          placeholder="Enter the url for thumbnail (Optional)"
          name="thumbnail"
          value={formikProps.values.thumbnail}
          onChange={(event) => {
            handleOnChange(event, formikProps.handleChange);
          }}
          isInvalid={!!formikProps.errors.thumbnail}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.thumbnail}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        mb="3"
        className="recommend-form-field-group"
        controlId="cardForm-descriptionField"
      >
        <Form.Label>Description</Form.Label>
        <Form.Control
          size="sm"
          as="textarea"
          rows={3}
          name="description"
          placeholder="Write a breif description (Optional)"
          value={formikProps.values.description}
          onChange={(event) => {
            handleOnChange(event, formikProps.handleChange);
          }}
        />
      </Form.Group>

      <div className="add-card-form-board">
        <Form.Check
          checked={formikProps.values.boardType === "select"}
          className="add-card-form-board-radio"
          type="radio"
          label="Select a board"
          id="cardForm-selectABoardRadio"
          name="boardType"
          value="select"
          onChange={(event) => {
            onBoardTypeChange(event, formikProps.handleChange);
          }}
        />

        <Form.Check
          checked={formikProps.values.boardType === "create"}
          className="add-card-form-board-radio"
          type="radio"
          label="Create a board"
          id="cardForm-createABoardRadio"
          name="boardType"
          value="create"
          onChange={(event) => {
            onBoardTypeChange(event, formikProps.handleChange);
          }}
        />
      </div>

      <Form.Group
        mb="3"
        className={
          showSelectBoardField
            ? "recommend-form-field-group"
            : "add-card-form-board-hide-field"
        }
        controlId="cardForm-boardSelection"
      >
        <Form.Select
          size="sm"
          name="selectedBoardId"
          value={formikProps.values.selectedBoardId}
          onChange={(event) => {
            handleOnChange(event, formikProps.handleChange);
          }}
        >
          {selectBoardOptions}
        </Form.Select>

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.selectedBoardId}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="3"
        controlId="cardForm-imageField"
        className={
          showSelectBoardField
            ? "add-card-form-board-hide-field"
            : "recommend-form-field-group"
        }
      >
        <Form.Control
          size="sm"
          type="text"
          placeholder="Enter the name of the board"
          name="boardName"
          value={formikProps.values.boardName}
          onChange={formikProps.handleChange}
          isInvalid={!!formikProps.errors.boardName}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.boardName}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="recommend-form-button">
        <Button size="sm" style={{ margin: "0 10px" }} type="submit">
          Add Card
        </Button>
        <Button
          size="sm"
          style={{ margin: "0 10px" }}
          type="button"
          onClick={clearForm}
        >
          Clear
        </Button>
      </div>
    </Form>
  );
}

CardForm.propTypes = {
  card: PropTypes.object,
  onUpdate: PropTypes.func,
};

ActualForm.propTypes = {
  availableBoards: PropTypes.array,
  onUpdate: PropTypes.func,
};
