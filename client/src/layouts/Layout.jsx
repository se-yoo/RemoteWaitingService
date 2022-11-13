import React from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import { Box } from '@mui/material';
import Auth from '../hoc/Auth';

const Layout = () => {
  return (
    <>
      <LayoutHeader />
      <main>
        <Box
          sx={{ 
            width: {
              xs: '100%',
              md: '80%',
              xl: '70%'
            },
            margin: {
              xs: '16px',
              sm: '32px',
              md: '32px auto',
              xl: '70px auto'
            }
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default Auth(Layout, true);