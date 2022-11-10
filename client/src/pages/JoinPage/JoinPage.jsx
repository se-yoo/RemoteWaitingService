import React, {useState} from 'react';
import {TextField,Button,Box, styled } from '@mui/material';
import {Radio,RadioGroup,FormControlLabel,FormControl} from '@mui/material';
//import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [value, setValue] = useState(null);

    return (
        <StyledLoginBox>
          <h1 sx={{ color: "#496F46" }}>
            회원가입
          </h1>
          
          <TextField label="아이디"  />
          <TextField label="비밀번호" type="password" sx={{ mt: 2.5 }}  />
          <TextField label="비밀번호확인"  type="password" sx={{ mt: 2.5 }}  />
          <TextField label="이름" sx={{ mt: 2.5 }}  />
          <LocalizationProvider sx={{ mt: 2.5 }} dateAdapter={AdapterDayjs}>
            <DatePicker
              label="생년월일"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField  sx={{ mt: 2.5 }}  {...params} />}
            />
          </LocalizationProvider>
          <TextField label="휴대폰번호" sx={{ mt: 2.5 }}  />
          <TextField label="이메일" sx={{ mt: 2.5 }}  />
          
          <FormControl sx={{float:"left", width:"100%",mt: 2.5}}>
            <RadioGroup
                row
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="admin" sx={{width:"50%"}} control={<Radio sx={{color:"#496F46"}} />} label="이벤트 관리자" />
                <FormControlLabel value="user" control={<Radio sx={{color:"#496F46"}} />} label="이벤트 참여자" />
            </RadioGroup>
          </FormControl>

          <Button sx={{
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


export default JoinPage;