import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const LoginForm = () => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField 
        placeholder="아이디"
      />
      <TextField 
        type="password"
        placeholder="비밀번호"
        sx={{ mt: 2.5 }}
      />
      <Button
        sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4
        }}
        fullWidth
      >
        로그인
      </Button>
    </Box>
  );
};

export default LoginForm;