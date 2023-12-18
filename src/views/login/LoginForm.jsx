import React, { useState } from 'react';
import { login } from '../../features/userSlice';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  styled,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  Visibility,
  VisibilityOff,
  MailOutline,
  Lock,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const Validation = (user) => {
    let validationErrors = {};
    if (!user?.email.trim()) {
      validationErrors.email = '* Email is Required';
    }
    if (!user?.password.trim()) {
      validationErrors.password = '* Password is Required';
    }
    setErrors({ ...errors, ...validationErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!Validation(user)) {
      setIsLoading(true);
      dispatch(login(user))
        .then((action) => {
          if (action.payload.message === 'Please provide email and password') {
            setErrors({ ...errors, email: action.payload.message });
            setIsLoading(false);
          } else if (action.payload.message === 'Incorrect email or password') {
            setErrors({
              ...errors,
              password: 'Incorrect email or password',
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            navigate(`/blogs`);
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
      <Typography variant='h4'>Welcome Back</Typography>
      <TextField
        type='text'
        margin='normal'
        fullWidth
        name='email'
        value={email}
        onChange={handleChange}
        placeholder='Email'
        error={!!errors.email}
        // helperText={errors.email}
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
      <TextField
        type={showPassword ? 'text' : 'password'}
        margin='normal'
        fullWidth
        name='password'
        value={password}
        onChange={handleChange}
        placeholder='Password'
        error={!!errors.password}
        // helperText={errors.password}
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
      <Link
        to={'/forgetPassword'}
        sx={{ alignSelf: 'flex-end', marginBottom: 1, textAlign: 'right' }}
      >
        Forgot password?
      </Link>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        type='submit'
        sx={{ borderRadius: '20px', marginTop: 1 }}
      >
        Sign In
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
          Have no account yet? <Link to={'/signup'}>Register</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;
