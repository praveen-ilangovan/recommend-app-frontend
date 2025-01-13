// React
import { useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../store/AuthContext';
import { updateCard } from '../../api/app';

export default function CardEditForm({card, onUpdate, onSave, onCancel}) {

  const {auth} = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Validation schema
  const schema = yup.object().shape({
    title: yup.string(),
    thumbnail: yup.string().url(),
    description: yup.string()
  });

  // ReactQuery
  const {mutateAsync: updateCardAsync, data, error} = useMutation({
    mutationFn: updateCard,
    retry: false,
    onSuccess(data) {
      console.log("Successfully updated!!", data);
      queryClient.invalidateQueries({queryKey: ['cards', card.id]});
    },
    onError(error) {
      console.log("Failed to log in", error)
    }
  });

  // Callback
  const onSubmit = async (values) => {
    console.log(values)

    await updateCardAsync( {
      accessToken: auth.accessToken,
      cardId: card.id,
      data: values} )

    if (onSave) {
      onSave();
    }
  }

  console.log("Incoming title: ", card.title);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        title: card.title,
        thumbnail: card.thumbnail,
        description: card.description,
      }}
    >
      <ActualForm onUpdate={onUpdate} onCancel={onCancel}/>
    </Formik>
  );
}

// Actual Form Component
function ActualForm({onUpdate, onCancel}) {

  const formikProps = useFormikContext();
  console.log("formikProps title: ", formikProps.values.title);

  // Callback
  function handleUpdate(updatedData) {
    if (onUpdate) {
      onUpdate(updatedData)
    }
  }

  function handleOnChange(event, formikHandleChange) {
    // Handle the in
    formikHandleChange(event);

    if (!['title', 'description', 'thumbnail'].includes(event.target.name)) {
      return
    }

    // Callback
    const updatedData = {};
    updatedData[event.target.name] = event.target.value;
    handleUpdate(updatedData);
  };

  const cancelClicked = () => {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <Form noValidate onSubmit={formikProps.handleSubmit}>

      <Form.Group
        md="3"
        controlId="cardEditForm-titleField"
        className="recommend-form-field-group"
      >
        <Form.Label>Title</Form.Label>
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
        controlId="cardEditForm-imageField"
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
        controlId="cardEditForm-descriptionField">
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

      <div className='recommend-form-button'>
        <Button size="sm" style={{ margin: "0 10px" }} type="submit">Save</Button>
        <Button size="sm" style={{ margin: "0 10px" }} type="button" onClick={cancelClicked} >Cancel</Button>
      </div>

    </Form>
  );
}
