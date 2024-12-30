// React
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../store/AuthContext';
import { getMe, addCard } from '../../api/app';
import { ROUTE } from '../../constants';

// Data: Local
import { TEST_EXTRACTED_DATA } from '../../../data';

export default function CardForm({id, url='', title='', thumbnail='', description='', boardId, onUpdate}) {

  // Validation schema
  const schema = yup.object().shape({
    url: yup.string().url().required(),
    title: yup.string().required(),
    thumbnail: yup.string().url(),
    description: yup.string(),
    selectedBoardId: yup.string()
  });

  // Get the boards and find the initial board value!
  const {auth, setAuth} = useContext(AuthContext);
  let firstBoard = null;
  const availableBoards = [];

  const {isLoading, data:meData, isSuccess, error, isError} = useQuery({
    queryKey: ['me', auth.userId],
    queryFn: async () => {
      const data = await getMe(auth.accessToken);
      return data;
    },
    refetchIntervalInBackground: false
    // Stop loading and fetching until it is invalidated.
  });

  if (isError) {
    return <h1>{error}</h1>
  }

  if (isSuccess) {
    if (meData?.data?.boards) {
      for (const board of meData?.data?.boards) {
        availableBoards.push( {id: board.id, name: board.name} )
      }
      firstBoard = meData?.data?.boards[0].id;
    }
  }

  // Add card mutation
  const redirect = useNavigate();
  const {mutateAsync, data, error:addCardError} = useMutation({
    mutationFn: addCard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully added a card!!", data);
      redirect(ROUTE.HOME);
    },
    onError(addCardError) {
      console.log("Failed to log in", addCardError)
    }
  });

  // Callbacks
  async function onSubmit(values) {
    console.log(values);
    return await mutateAsync({
      accessToken: auth.accessToken,
      boardId: values.selectedBoardId,
      data: {url: values.url, title: values.title, thumbnail: values.thumbnail, description: values.description}
    })
  }


  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        url: url,
        title: title,
        thumbnail: thumbnail,
        description: description,
        selectedBoardId: firstBoard
      }}
    >
      <ActualForm availableBoards={availableBoards} onUpdate={onUpdate}/>
    </Formik>
  );
}

// Actual Form Component
function ActualForm({availableBoards, onUpdate}) {

  const selectBoardOptions = [];
  const formikProps = useFormikContext();

  function handleUpdate(updatedData) {
    if (onUpdate) {
      onUpdate(updatedData)
    }
  }

  function handleOnChange(event, formikHandleChange) {

    // Handle the in
    formikHandleChange(event);

    // Callback
    const updatedData = {};
    updatedData[event.target.name] = event.target.value;
    handleUpdate(updatedData);
  };

  function extract() {
    const data = TEST_EXTRACTED_DATA[Math.floor(Math.random() * 3)]

    formikProps.setFieldValue('url', data.url);
    formikProps.setFieldValue('title', data.title);
    formikProps.setFieldValue('thumbnail', data.thumbnail, true);
    formikProps.setFieldValue('description', data.description);

    // Call the update
    const updatedData = {
      'url': data.url,
      'title': data.title,
      'thumbnail': data.thumbnail,
      'description': data.description
    };
    handleUpdate(updatedData);
  }

  function clearForm() {
    formikProps.resetForm();
    handleUpdate(null);
  }

  // Populate the options
  for (const op of availableBoards) {
    selectBoardOptions.push( <option key={op.id} value={op.id}>{op.name}</option> )
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
            onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
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
          onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
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
          onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
          isInvalid={!!formikProps.errors.thumbnail}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.thumbnail}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        mb="3"
        className="recommend-form-field-group"
        controlId="cardForm-descriptionField">
        <Form.Label>Description</Form.Label>
        <Form.Control
            size="sm"
            as="textarea"
            rows={3}
            name="description"
            placeholder='Write a breif description (Optional)'
            value={formikProps.values.description}
            onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
        />
      </Form.Group>

      <Form.Group
        mb="3"
        className="recommend-form-field-group"
        controlId="cardForm-boardSelection">
        <Form.Label>Select the board</Form.Label>
        <Form.Select
          size="sm"
          name="selectedBoardId"
          value={formikProps.values.selectedBoardId}
          onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}>
          {selectBoardOptions}
        </Form.Select>

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.selectedBoardId}
        </Form.Control.Feedback>
      </Form.Group>

      <div className='recommend-form-button'>
        <Button size="sm" style={{ margin: "0 10px" }} type="submit">Add Card</Button>
        <Button size="sm" style={{ margin: "0 10px" }} type="button" onClick={clearForm}>Clear</Button>
      </div>

    </Form>
  );
}
