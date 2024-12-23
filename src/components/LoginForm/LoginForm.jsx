// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

export default function LoginForm() {

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });

  function login(values) {
    console.log(values);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={login}
      initialValues={{
        username: '',
        password: ''
      }}
    >
      <ActualForm />
    </Formik>
  );
}

function ActualForm() {
  const formikProps = useFormikContext();

  return (
    <Form noValidate onSubmit={formikProps.handleSubmit}>

      <Form.Group
        md="6"
        controlId="loginForm-usernameField"
        className="position-relative"
      >
        <Form.Label>Email address/Username *</Form.Label>

        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="username"
          value={formikProps.values.username}
          onChange={formikProps.handleChange}
          isInvalid={!!formikProps.errors.username}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="6"
        controlId="loginForm-passwordField"
        className="position-relative"
      >
        <Form.Label>Password *</Form.Label>

        <Form.Control
          type="password"
          name="password"
          value={formikProps.values.password}
          onChange={formikProps.handleChange}
          isInvalid={formikProps.touched.password && !!formikProps.errors.password}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div style={{ textAlign: "center" }}>
        <Button style={{ margin: "10px" }} type="submit">Login</Button>
      </div>

    </Form>
  );
}
