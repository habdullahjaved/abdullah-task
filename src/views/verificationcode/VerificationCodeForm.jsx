import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { verifyCode } from '../../features/userSlice';
import { useNavigate } from 'react-router';

const VerificationCodeForm = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newVerificationCode = Array(6).fill('');

    // Check if pasted value is a 6-digit code
    if (/^\d{6}$/.test(value)) {
      value.split('').forEach((digit, i) => {
        newVerificationCode[i] = digit;
      });
    }

    setVerificationCode(newVerificationCode);
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text');
    handleChange(0, pastedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = verificationCode.join('');
    console.log('Verification Code:', code);

    const user = {
      email: email,
      code: code,
    };

    dispatch(verifyCode(user))
      .then((action) => {
        console.log(action.payload);
        // Handle success, you can navigate to another page or show a success message
        if (action.payload.message === 'Success') {
          navigate('/resetPassword'); // Replace with the desired page
        } else {
          console.error('Verification code is invalid');
        }
      })
      .catch((error) => {
        console.error('Error verifying code:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} onPaste={handlePaste}>
      <Typography variant='h4'>Enter Verification Code</Typography>
      <Box display='flex' justifyContent='center'>
        {verificationCode.map((digit, index) => (
          <TextField
            key={index}
            type='text'
            variant='outlined'
            margin='normal'
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            sx={{ margin: '0 4px', width: '50px' }}
          />
        ))}
      </Box>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        sx={{ marginTop: 2 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default VerificationCodeForm;
