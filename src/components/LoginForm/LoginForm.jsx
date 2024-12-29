// React
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Components: Project
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormikContext, Formik} from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../store/AuthContext';
import { login } from '../../api/auth';

// Data
import { ROUTE } from '../../constants';

export default function LoginForm() {

  // Validation schema
  const schema = yup.object().shape({
    emailaddress: yup.string().required(),
    password: yup.string().required()
  });

  // Context
  const {setAuth} = useContext(AuthContext);
  const redirect = useNavigate();

  // ReactQuery
  const {mutateAsync, data, error} = useMutation({
    mutationFn: login,
    retry: false,
    onSuccess(data) {
      console.log("Successfully logged in!!", data.data);
      setAuth({accessToken: data.data.access_token,
               userId: data.data.id,
               userFirstname: data.data.first_name});
      redirect(ROUTE.HOME);
    },
    onError(error) {
      console.log("Failed to log in", error)
    }
  });

  async function onSubmit(values) {
    await mutateAsync(values);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        emailaddress: '',
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
          isInvalid={formikProps.touched.password && !!formikProps.errors.password}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {formikProps.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div className='recommend-form-button'>
        <Button size="sm" type="submit">Login</Button>
      </div>

    </Form>
  );
}
