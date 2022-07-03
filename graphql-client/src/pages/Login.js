import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';

import { useForm } from '../hooks/useForm';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, Stack, Alert } from '@mui/material';

import { LOGIN_USER } from '../gql/nodes/loginUser';

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  if (loading) return <div className='container homepage'>Loading</div>;

  return (
    <Container spacing={2} maxWidth='sm' style={{ margin: '2rem auto' }}>
      <h2>Login</h2>
      <p style={{ marginTop: '1rem' }}>Login Page</p>
      <Stack spacing={2} padding={4}>
        <TextField label='Email' name='email' onChange={onChange} />
        <TextField
          label='Password'
          name='password'
          type='password'
          onChange={onChange}
        />
      </Stack>
      {errors &&
        errors.map((error, index) => (
          <Alert key={`${index}-${error.message}`} severity='error'>
            {error.message}
          </Alert>
        ))}
      <Button variant='contained' onClick={onSubmit}>
        Login
      </Button>
    </Container>
  );
}
