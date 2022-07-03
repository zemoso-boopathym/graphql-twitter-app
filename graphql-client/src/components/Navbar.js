import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar
          style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}
        >
          <Typography
            variant='h5'
            component='div'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: 'white',
                marginLeft: '1rem',
              }}
            >
              <img
                src='https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png'
                alt='logo'
                height='64'
                width='64'
                style={{ verticalAlign: 'bottom' }}
              />
            </Link>
            {user && (
              <Link
                to='/tweets'
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  marginLeft: '2rem',
                }}
              >
                Tweets
              </Link>
            )}
          </Typography>
          <Box alignItems='right' sx={{ flexGrow: 1, textAlign: 'right' }}>
            {user ? (
              <Button
                onClick={onLogout}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  marginRight: '2rem',
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  to='/login'
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    marginRight: '2rem',
                  }}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    marginRight: '1rem',
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
