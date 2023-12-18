// PrivateRoutes.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const user = useSelector((state) => state.user.user);
  const token = user?.data;
  const isEmpty = user && Object.values(user)?.some((value) => value === '');
  const TOKEN = () => {
    if (token) {
      return user;
    } else {
      return '';
    }
  };

  return !TOKEN() ? <Navigate to='/' /> : <Outlet />;
};

export default PrivateRoutes;
