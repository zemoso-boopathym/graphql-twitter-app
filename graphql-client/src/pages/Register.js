import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';

import { useForm } from '../hooks/useForm';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, Stack, Alert } from '@mui/material';

import { REGISTER_USER } from '../gql/nodes/registerUser';

export default function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const registerUserCallback = () => {
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <Container spacing={2} maxWidth='sm' style={{ margin: '2rem auto' }}>
      <h2>Register</h2>
      <p style={{ marginTop: '1rem' }}>Register below to create an account.</p>
      <Stack spacing={2} padding={4}>
        <TextField label='Firstname' name='first_name' onChange={onChange} />
        <TextField label='Lastname' name='last_name' onChange={onChange} />
        <TextField label='Username' name='username' onChange={onChange} />
        <TextField label='Email' name='email' onChange={onChange} />
        <TextField
          label='Password'
          name='password'
          type='password'
          onChange={onChange}
        />
        <TextField
          label='Confirm Password'
          name='confirmPassword'
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
        Register
      </Button>
    </Container>
  );
}
