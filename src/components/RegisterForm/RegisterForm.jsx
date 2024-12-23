// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

export default function RegisterForm() {

  const schema = yup.object().shape({
    emailaddress: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  function register(values) {
    console.log(values);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={register}
      initialValues={{
        emailaddress: '',
        password: '',
        passwordConfirmation: ''
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
        controlId="registerForm-emailaddressField"
        className="position-relative"
      >
        <Form.Label>Email address *</Form.Label>

        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="emailaddress"
          value={formikProps.values.emailaddress}
          onChange={formikProps.handleChange}
          isInvalid={!!formikProps.errors.emailaddress}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.emailaddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="6"
        controlId="registerForm-passwordField"
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

      <Form.Group
        md="6"
        controlId="registerForm-passwordConfField"
        className="position-relative"
      >
        <Form.Label>Confrim Password *</Form.Label>

        <Form.Control
          type="password"
          name="passwordConfirmation"
          value={formikProps.values.passwordConfirmation}
          onChange={formikProps.handleChange}
          isInvalid={formikProps.touched.passwordConfirmation && !!formikProps.errors.passwordConfirmation}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </Form.Group>

      <div style={{ textAlign: "center" }}>
        <Button style={{ margin: "10px" }} type="submit">Register</Button>
      </div>

    </Form>
  );
}

