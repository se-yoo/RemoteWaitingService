import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import { Box } from '@mui/material';
import Auth from '../hoc/Auth';
import { useSelector } from 'react-redux';
import { windowScrollTop } from '../utils/function';

const Layout = () => {
  const userData = useSelector(state => state.user.userData);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === "/" && userData) {
      if(userData.isAdmin) {
        navigate("/event");
      } else {
        navigate("/user/event/list");
      }
    }
    
    windowScrollTop();
  }, [location, userData]);

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