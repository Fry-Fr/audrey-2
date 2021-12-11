import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import schema from '../validation/loginFormSchema';

import {
  Input,
  Heading,
  FormDiv,
  Button,
  Error
} from '../styles/StyledComponents'

const Login = props => {
  const [form, setForm] = useState({username:'',password:''});
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  props.errHandle(props.user.error)
  const { push } = useHistory();

  useEffect( () => {
    schema.isValid(form)
    .then( valid => {
      setDisabled(!valid)
    })
  },[form])

  const updateForm = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then( res => {
      setError({
        ...error,
        [name]: ''
      })
    })
    .catch( err => {
      setError({
        ...error,
        [name]: err.errors[0]
      })
    })

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleChange = (event) => {
    event.stopPropagation();
    const { name, value } = event.target;
    updateForm(name, value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      props.fetchStatus(true);
      props.loginUser(form, props.fetchStatus, push);   
    };
    
  return (
    <>
      <Heading>Login page</Heading>
      {props.appErr ? <Error>{props.appErr}</Error> : null}
      <FormDiv onSubmit={handleSubmit}>
          {error.username ? <Error>{error.username}</Error> : undefined}
        <Input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} />

          {error.password ? <Error>{error.password}</Error> : undefined}
        <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

        <Button disabled={disabled} type="submit">Login</Button>
      </FormDiv>
    </>
  );
};

export default Login;
