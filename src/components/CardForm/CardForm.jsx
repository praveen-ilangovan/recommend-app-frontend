// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

// Data: Local
import { TEST_EXTRACTED_DATA } from '../../../data';

export default function CardForm({onUpdate}) {

  const schema = yup.object().shape({
    url: yup.string().url().required(),
    title: yup.string().required(),
    thumbnail: yup.string().url(),
    description: yup.string()
  });

  function addCard(values) {
    console.log(values);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={addCard}
      initialValues={{
        url: '',
        title: '',
        thumbnail: '',
        description: ''
      }}
    >
      <ActualForm onUpdate={onUpdate}/>
    </Formik>
  );
}

// Actual Form Component
function ActualForm({onUpdate}) {

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

  return (
    <Form noValidate onSubmit={formikProps.handleSubmit}>

      <Form.Group
        md="6"
        controlId="cardForm-urlField"
        className="position-relative"
      >
        <Form.Label>Url *</Form.Label>

        <InputGroup className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter the url"
            name="url"
            value={formikProps.values.url}
            onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
            isInvalid={formikProps.touched.url && !!formikProps.errors.url}
          />
          <Button
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
        className="position-relative"
      >
        <Form.Label>Title *</Form.Label>
        <Form.Control
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
        className="position-relative"
      >
        <Form.Label>Image</Form.Label>
        <Form.Control
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

      <Form.Group className="mb-3" controlId="cardForm-descriptionField">
        <Form.Label>Description</Form.Label>
        <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder='Write a breif description (Optional)'
            value={formikProps.values.description}
            onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
        />
      </Form.Group>

      <div style={{ textAlign: "center" }}>
        <Button style={{ margin: "10px" }} type="submit">Add Card</Button>
        <Button style={{ margin: "10px" }} type="button" onClick={clearForm}>Clear</Button>
      </div>

    </Form>
  );
}
