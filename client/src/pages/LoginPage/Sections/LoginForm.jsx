import React,{ useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../store/actions/user_actions';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const onUserIDHandler = (event) =>{
    setUserID(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('id',userID);
    console.log('password',password);

    let body = {
      userId: userID,
      password:password
    }

    //로그인 액션
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        navigate('/');
      }
      else{
        alert('로그인할 수 없습니다!');
      }
    })

  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmitHandler}
    >
      <TextField 
        label="아이디" value={userID} onChange={onUserIDHandler}
      />
      <TextField value={password} onChange={onPasswordHandler}
        type="password"
        label="비밀번호"
        sx={{ mt: 2.5 }}
      />
      <Button type='submit'
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