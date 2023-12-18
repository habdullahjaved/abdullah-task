import React, { useState } from 'react';
import { resetPassword } from '../../features/userSlice';
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ResetPasswordForm = () => {
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { password, confirmPassword } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: '',
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const Validation = (user) => {
    let validationErrors = {};
    if (!user?.password.trim()) {
      validationErrors.password = '* Password is Required';
    }
    if (user?.password !== user?.confirmPassword) {
      validationErrors.confirmPassword = '* Passwords do not match';
    }
    setErrors({ ...errors, ...validationErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!Validation(user)) {
      setIsLoading(true);
      const user2 = {
        password: user.password,
        confirmPassword: user.confirmPassword,
        token: token,
      };
      dispatch(resetPassword(user2))
        .then((action) => {
          console.log(action.payload);
          // Ensure action.payload is defined before accessing its properties
          if (
            action.payload &&
            action.payload.message === 'Password reset successfully'
          ) {
            setIsLoading(false);
            navigate(`/`);
          } else {
            setErrors({
              ...errors,
              password: 'Failed to reset password',
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error, 'error here');
          setIsLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h4'>Reset Password</Typography>
      <TextField
        type={showPassword ? 'text' : 'password'}
        margin='normal'
        fullWidth
        name='password'
        value={password}
        onChange={handleChange}
        placeholder='New Password'
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton size='small'>
                <Lock />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton size='small' onClick={handleTogglePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ borderRadius: '20px', marginTop: 1 }}
      />
      <TextField
        type={showPassword ? 'text' : 'password'}
        margin='normal'
        fullWidth
        name='confirmPassword'
        value={confirmPassword}
        onChange={handleChange}
        placeholder='Confirm Password'
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton size='small'>
                <Lock />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton size='small' onClick={handleTogglePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
        Reset Password
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Divider sx={{ width: '40%', marginLeft: 1, marginRight: 1 }} />
        <Typography
          variant='body2'
          sx={{ color: 'text.secondary', paddingX: 1 }}
        >
          Or
        </Typography>
        <Divider sx={{ width: '40%', marginLeft: 1 }} />
      </Box>
      <Box>
        <Typography variant='body2'>
          Remember your password? <Link to={'/'}>Login</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
