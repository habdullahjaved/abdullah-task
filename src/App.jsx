import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Test from './views/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login/Login';
import Blogs from './views/blogs/Blogs';
import PrivateRoutes from './utils/PrivateRoutes';
import BlogPage from './views/blogs/blog/BlogPage';
import Signup from './views/signup/Signup';
import ForgotPassword from './views/forgotpassword/ForgotPassword';
import ResetPassword from './views/resetpassword/ResetPassword';
import VerificationCode from './views/verificationcode/VerificationCode';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<BlogPage />} />
          </Route>

          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetPassword' element={<ForgotPassword />} />
          <Route path='/verificationCode' element={<VerificationCode />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
