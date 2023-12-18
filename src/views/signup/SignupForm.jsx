import React, { useState } from 'react';
import { signup } from '../../features/userSlice';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  MailOutline,
  Lock,
  Person,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: '',
    }));
  };
  const handleCountryChange = (e) => {
    setUser((prevState) => ({ ...prevState, country: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      country: '',
    }));
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const Validation = () => {
    let validationErrors = {};

    // Name validation
    if (!user?.name.trim()) {
      validationErrors.name = '* Name is Required';
    }

    // Email validation
    if (!user?.email.trim()) {
      validationErrors.email = '* Email is Required';
    }

    // Password validation
    if (!user?.password.trim()) {
      validationErrors.password = '* Password is Required';
    }

    // Confirm Password validation
    if (user?.password !== user?.confirmPassword) {
      validationErrors.confirmPassword = '* Passwords do not match';
    }

    setErrors({ ...validationErrors });
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (!Validation(user)) {
      setIsLoading(true);
      dispatch(signup(user))
        .then((action) => {
          console.log(action.payload);
          if (action.payload.message === 'Please provide a email') {
            setErrors({ ...errors, email: action.payload.message });
            setIsLoading(false);
          } else if (action.payload.message === 'Please provide a name') {
            setErrors({
              ...errors,
              name: action.payload.message,
            });
            setIsLoading(false);
          } else if (
            action.payload.message === 'Please provide a password' ||
            action.payload.message ===
              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
          ) {
            setErrors({
              ...errors,
              password: action.payload.message,
            });

            setIsLoading(false);
          } else if (
            action.payload.message === 'Please confirm your password'
          ) {
            setErrors({
              ...errors,
              confirmPassword: action.payload.message,
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            navigate(`/`);
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
      <Typography variant='h4'>Sign Up</Typography>
      <TextField
        type='text'
        margin='normal'
        fullWidth
        name='name'
        value={user.name}
        onChange={handleChange}
        placeholder='Name'
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton size='small'>
                <Person />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ borderRadius: '20px', marginTop: 1 }}
      />
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
      <TextField
        type={showPassword ? 'text' : 'password'}
        margin='normal'
        fullWidth
        name='password'
        value={user.password}
        onChange={handleChange}
        placeholder='Password'
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
        value={user.confirmPassword}
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
      <FormControl fullWidth sx={{ marginTop: 1 }}>
        {/* <InputLabel htmlFor='country'>Country</InputLabel> */}
        <Select
          value={user.country}
          onChange={handleCountryChange}
          name='country'
          displayEmpty
        >
          <MenuItem value='' sx={{ textAlign: 'left' }}>
            Select Country
          </MenuItem>
          <MenuItem value='pakistan' sx={{ textAlign: 'left' }}>
            Pakistan
          </MenuItem>
          <MenuItem value='france' sx={{ textAlign: 'left' }}>
            France
          </MenuItem>
          <MenuItem value='england' sx={{ textAlign: 'left' }}>
            England
          </MenuItem>
          <MenuItem value='australia' sx={{ textAlign: 'left' }}>
            Australia
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        type='submit'
        sx={{ borderRadius: '20px', marginTop: 1 }}
      >
        Sign Up
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
          Already have an account? <Link to={'/'}>Login</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default SignupForm;
