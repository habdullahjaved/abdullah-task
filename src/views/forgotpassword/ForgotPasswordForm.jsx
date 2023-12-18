import React, { useState } from 'react';
import { forgotPassword } from '../../features/userSlice';
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
} from '@mui/material';

import { MailOutline, Lock, Person } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [user, setUser] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!user.email.trim()) {
      setErrors({ email: '* Email is Required' });
      return;
    }

    setIsLoading(true);

    dispatch(forgotPassword(user))
      .then((action) => {
        console.log(action.payload);
        if (
          action.payload.message === 'Recovery code send to your email address'
        ) {
          navigate('/verificationCode', { state: { email: user.email } });
          setIsLoading(false);
          // Handle success, you can navigate to another page or show a success message
          console.log('Verification code sent successfully');
        } else {
          setErrors({ email: 'Failed to send verification code' });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error, 'error here');
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h4'>Forgot Password</Typography>
      <TextField
        type='text'
        margin='normal'
        fullWidth
        name='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Email'
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton size='small'>
                <MailOutline />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ borderRadius: '20px', marginTop: 1 }}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        type='submit'
        sx={{ borderRadius: '20px', marginTop: 1 }}
      >
        Send Verification Code
      </Button>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Link onClick={() => navigate('/')} color='primary'>
          Back to Login
        </Link>
      </Box>
    </form>
  );
};

export default ForgotPasswordForm;
