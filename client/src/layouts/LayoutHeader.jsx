import React, { useCallback } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Image from 'mui-image';
import Logo from '../assets/images/logo.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import OutputIcon from '@mui/icons-material/Output';
import { useNavigate } from 'react-router-dom';

const iconStyle = {
  width: '30px',
  height: '30px',
  color: "#496F46"
};

const LayoutHeader = () => {
  const navigate = useNavigate();

  const onClickLogo = useCallback(() => {
    navigate('/');
  }, []);

  const onClickMyPage = useCallback(() => {
    navigate('/mypage');
  }, []);

  const onClickLogout = useCallback(() => {
    // 추후 로그아웃 처리
    navigate('/login');
  }, []);
  
  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: "0px 4px 10px 2px rgba(73, 111, 70, 0.12)" }}
    >
      <Toolbar
        sx={{
          background: "#FFFFFF",
          height: "100px",
        }}
      >
        <Image
          src={Logo}
          width="100px"
          fit="contain"
          bgColor="transparent"
          class="cursor-pointer"
          onClick={onClickLogo}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={onClickMyPage}>
          <PermIdentityIcon sx={iconStyle}/>
        </IconButton>
        <IconButton sx={{ ml: '8px' }} onClick={onClickLogout}>
          <OutputIcon sx={iconStyle}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutHeader;