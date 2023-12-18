import React from 'react';
import { Typography, Grid, Box, Paper, styled } from '@mui/material';
import LoginForm from './LoginForm';
import image from '../../assets/img/Group.png';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const gridOneStyle = {
  height: '100vh',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#3949AB',
};

const Login = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Left Section - Info */}
        <Grid item xs={12} md={6} sx={gridOneStyle}>
          {/* Place your image and text content here */}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={image} alt='' />
            <Typography variant='h4' sx={{ color: '#fff' }}>
              Welcome aboard my friend
            </Typography>
            <Typography variant='body1' sx={{ color: '#fff' }}>
              Just a couple of click and we start
            </Typography>
          </Box>
        </Grid>
        {/* Right Section - Login Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '11px',
          }}
        >
          <LoginForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
