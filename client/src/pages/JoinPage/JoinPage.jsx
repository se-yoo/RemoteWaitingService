import React, {useState} from 'react';
import {TextField,Button,Box, styled } from '@mui/material';
import {Radio,RadioGroup,FormControlLabel,FormControl} from '@mui/material';
//import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Auth from '../../hoc/Auth';
import {ROLE_TYPE} from '../../utils/code'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../store/actions/user_actions';
import dayjs from 'dayjs';

const StyledLoginBox = styled(Box)({
  maxWidth: "440px",
  width: "80%",
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const JoinPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setpwCheck] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userId: userID,
      password:password,
      name:name,
      birthDay:birthDay,
      phoneNumber:phoneNumber,
      email:email,
      role:role
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        navigate('/');
        alert('회원가입을 축하합니다! 로그인 후 이용해주세요');
      }
      else{
        console.log(response.payload.err);
        alert('Error!');
      }
    })

  }

  const onUserIDHandler = (event) =>{
    setUserID(event.currentTarget.value);
  }
  const onPWHandler = (event) =>{
    setPassword(event.currentTarget.value);
  }
  const onPWCheckHandler = (event) =>{
    setpwCheck(event.currentTarget.value);
  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value);
  }
  const onPhoneHandler = (event) =>{
    setPhoneNumber(event.currentTarget.value);
  }
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value);
  }
  const onRadioHandler = (event) =>{
    setRole(event.currentTarget.value);
  }

  return (
    <StyledLoginBox component="form" onSubmit={onSubmitHandler}>
      <h1 sx={{ color: "#496F46" }}>
        회원가입
      </h1>
      
      <TextField onChange={onUserIDHandler} value={userID} label="아이디"  />
      <TextField onChange={onPWHandler} value={password} label="비밀번호" type="password" sx={{ mt: 2.5 }}  />
      <TextField onChange={onPWCheckHandler} value={pwCheck} label="비밀번호확인"  type="password" sx={{ mt: 2.5 }}  />
      <TextField onChange={onNameHandler} value={name} label="이름" sx={{ mt: 2.5 }}  />
      <LocalizationProvider sx={{ mt: 2.5 }} dateAdapter={AdapterDayjs}>
        <DatePicker inputFormat={"YYYY-MM-DD"} mask={'____-__-__'}
          label="생년월일"
          value={birthDay}
          onChange={(newValue) => {
            setBirthDay(dayjs(newValue).format("YYYY-MM-DD"));
          }}
          renderInput={(params) => <TextField  sx={{ mt: 2.5 }}  {...params} />}
        />
      </LocalizationProvider>
      <TextField onChange={onPhoneHandler} value={phoneNumber} label="휴대폰번호" sx={{ mt: 2.5 }}  />
      <TextField onChange={onEmailHandler} value={email} label="이메일" sx={{ mt: 2.5 }}  />
      
      <FormControl sx={{float:"left", width:"100%",mt: 2.5}}>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          onChange={onRadioHandler}
        >
          <FormControlLabel value={ROLE_TYPE.EVENT_MANAGER} sx={{width:"50%"}} control={<Radio sx={{color:"#496F46"}} />} label="이벤트 관리자" />
          <FormControlLabel value={ROLE_TYPE.EVENT_PARTICIPANT} control={<Radio sx={{color:"#496F46"}} />} label="이벤트 참여자" />
        </RadioGroup>
      </FormControl>

      <Button type="submit" sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4
        }}
        fullWidth
      >
        회원가입
      </Button>
    </StyledLoginBox>
  );
};

export default Auth(JoinPage, false);