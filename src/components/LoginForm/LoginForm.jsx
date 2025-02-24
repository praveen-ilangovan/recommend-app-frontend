// Components: Project
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormikContext, Formik } from "formik";
import * as yup from "yup";

import { useCreateSession } from "../../rqhooks/useCreateSession";

export default function LoginForm() {
  // Validation schema
  const schema = yup.object().shape({
    emailaddress: yup.string().required(),
    password: yup.string().required(),
  });

  const { mutateAsync: createSession, isError, error } = useCreateSession();

  if (isError && error.status === 400) {
    alert("Login failed. Please check your authentication details");
  }

  async function onSubmit(values) {
    await createSession(values);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        emailaddress: "",
        password: "",
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
        controlId="loginForm-emailaddressField"
        className="recommend-form-field-group"
      >
        <Form.Label>Email address *</Form.Label>

        <Form.Control
          size="sm"
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
        controlId="loginForm-passwordField"
        className="recommend-form-field-group"
      >
        <Form.Label>Password *</Form.Label>

        <Form.Control
          size="sm"
          type="password"
          name="password"
          value={formikProps.values.password}
          onChange={formikProps.handleChange}
          isInvalid={
            formikProps.touched.password && !!formikProps.errors.password
          }
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="recommend-form-button">
        <Button size="sm" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}
