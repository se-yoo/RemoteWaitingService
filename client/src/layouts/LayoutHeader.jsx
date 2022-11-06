import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Image from 'mui-image';
import Logo from '../assets/images/logo.png';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import OutputIcon from '@mui/icons-material/Output';

const iconStyle = {
  width: '30px',
  height: '30px',
  color: "#496F46"
};

const LayoutHeader = () => {
  return (
    <AppBar
      position="sticky"
      sx={{boxShadow: "0px 4px 10px 2px rgba(73, 111, 70, 0.12)"}}
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
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <PermIdentityIcon sx={iconStyle}/>
        </IconButton>
        <IconButton sx={{ ml: '8px' }}>
          <OutputIcon sx={iconStyle}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default LayoutHeader;