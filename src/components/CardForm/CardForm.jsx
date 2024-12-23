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
    image: yup.string().url(),
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
        image: '',
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

  function handleOnChange(event, formikHandleChange) {

    // Handle the in
    formikHandleChange(event);

    // Callback
    if (onUpdate) {
      // console.log(formikProps.errors[event.target.name])
      const updatedData = {}
      updatedData[event.target.name] = event.target.value;
      onUpdate(updatedData)
    }
  };

  function extract() {
    const data = TEST_EXTRACTED_DATA[Math.floor(Math.random() * 3)]

    formikProps.setFieldValue('url', data.url);
    formikProps.setFieldValue('title', data.title);
    formikProps.setFieldValue('image', data.image, true);
    formikProps.setFieldValue('description', data.description);

    // Call the update
    if (onUpdate) {
      const updatedData = {
        'url': data.url,
        'title': data.title,
        'image': data.image,
        'description': data.description
      }
      onUpdate(updatedData)
    }
  }

  return (
    <Form noValidate onSubmit={formikProps.handleSubmit} style={{ width: '35rem' }}>

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
          placeholder="Enter the url of an image (Optional)"
          name="image"
          value={formikProps.values.image}
          onChange={(event) => {handleOnChange(event, formikProps.handleChange)}}
          isInvalid={!!formikProps.errors.image}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.image}
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

      <Button type="submit">Add Card</Button>

    </Form>
  );
}
