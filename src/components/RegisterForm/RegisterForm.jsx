import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Components: Project
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormikContext, Formik } from "formik";
import * as yup from "yup";

import { registerUser } from "../../api/auth";
import { ROUTE } from "../../constants";

export default function RegisterForm() {
  const redirect = useNavigate();

  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    emailaddress: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  // ReactQuery
  const { mutateAsync: registerUserAsync } = useMutation({
    mutationFn: registerUser,
    retry: false,
    onSuccess(data) {
      console.log("Successfully added a card!!", data);
      redirect(ROUTE.LOGIN);
    },
    onError(error) {
      console.log("Failed to log in", error);
    },
  });

  // Callback
  async function onSubmit(values) {
    console.log(values);
    await registerUserAsync({
      first_name: values.firstname,
      last_name: values.lastname,
      email_address: values.emailaddress,
      user_name: values.username,
      password: values.password,
    });
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        firstname: "",
        lastname: "",
        emailaddress: "",
        username: "",
        password: "",
        passwordConfirmation: "",
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
        controlId="registerForm-firstnameField"
        className="recommend-form-field-group"
      >
        <Form.Label>First name *</Form.Label>

        <Form.Control
          size="sm"
          type="text"
          placeholder="John"
          name="firstname"
          value={formikProps.values.firstname}
          onChange={formikProps.handleChange}
          isInvalid={!!formikProps.errors.firstname}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.firstname}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="6"
        controlId="registerForm-lastnameField"
        className="recommend-form-field-group"
      >
        <Form.Label>Last name *</Form.Label>

        <Form.Control
          size="sm"
          type="text"
          placeholder="Doe"
          name="lastname"
          value={formikProps.values.lastname}
          onChange={formikProps.handleChange}
          isInvalid={!!formikProps.errors.lastname}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.lastname}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        md="6"
        controlId="registerForm-emailaddressField"
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
        controlId="registerForm-usernameField"
        className="recommend-form-field-group"
      >
        <Form.Label>Username *</Form.Label>

        <Form.Control
          size="sm"
          type="text"
          placeholder="name123"
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
        controlId="registerForm-passwordField"
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

      <Form.Group
        md="6"
        controlId="registerForm-passwordConfField"
        className="recommend-form-field-group"
      >
        <Form.Label>Confrim Password *</Form.Label>

        <Form.Control
          size="sm"
          type="password"
          name="passwordConfirmation"
          value={formikProps.values.passwordConfirmation}
          onChange={formikProps.handleChange}
          isInvalid={
            formikProps.touched.passwordConfirmation &&
            !!formikProps.errors.passwordConfirmation
          }
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="recommend-form-button">
        <Button size="sm" type="submit">
          Create an account
        </Button>
      </div>
    </Form>
  );
}
