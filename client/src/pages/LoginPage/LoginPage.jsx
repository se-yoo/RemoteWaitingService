import React,{useState} from 'react';
import {TextField,Box} from '@mui/material';
import Image from 'mui-image';
import Logo from '../../assets/images/logo.png';

const tf_style={
  "& .MuiInputLabel-root": {color: 'green'},//styles the label
  "& .MuiInputLabel-root.Mui-focused": {color: 'green'},
  "& .MuiOutlinedInput-root": {
    "& > fieldset": { borderColor: "green"},
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {borderColor: "green" }
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {borderColor: "green" }
  },
  '& .MuiInputBase-root': {
    color: 'green',
    borderRadius:100
  },
  margin:"5px",
  width:"300px"
}

const btn_style={
  margin:"5px",
  width:"300px",
  height:"56px",
  padding:0,
  borderRadius:100,
  border:0,
  color:"white",
  background:"#496F46",
  fontSize:"15px",
  fontWeight:"bold"
}

const LoginPage = () => {

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };  

  const boxStyle = {
    color:"green", 
    fontWeight:"bold",
    textDecoration: isHover ? "underline" : "none"
 };

  return (
    <Box
      component="form"
       sx={{
        width:"350px",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
        textAlign:"center"
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{width:"60%", margin:"auto"}}><Image src={Logo} /></div>
      
      <TextField sx={tf_style} id="outlined-basic" label="ID"  />
      <TextField sx={tf_style} id="outlined-basic" type="password" label="PW"  />
      <button 
       style={btn_style}
      >
        로그인
      </button>
      <div>
        <span style={{fontWeight:"bold"}}>계정이 없으신가요?</span> <span><a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={boxStyle} href='/test'>가입하기</a></span>
      </div>
    </Box>
    
  );
};

export default LoginPage;