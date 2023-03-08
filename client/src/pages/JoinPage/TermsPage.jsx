import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Box,Button,Checkbox,FormControlLabel, styled} from '@mui/material';
import Auth from '../../hoc/Auth';
import terms  from './terms.txt';
import { useEffect } from 'react';

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

const TermsPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [termsText, setTermsText] = useState("");
    
    const CheckedHandler = () => {
        setIsChecked(!isChecked);

      };

    const navigate = useNavigate(null);
 
    const navigateToJoin = () => {
        navigate("/join");
    };

    useEffect(()=>{
      fetch(terms)
      .then(r => r.text())
      .then(text => {
        console.log('결과 : ', text);
        setTermsText(text);
      });
    },[])


    return (
      <StyledLoginBox>
          <h1 sx={{ color: "#496F46" }}>
            회원가입
          </h1>
          
          <textarea readOnly value={termsText} style={{
            width:"100%",
            height:"500px",
            border:"1px solid #496F46",
            borderRadius:"20px",
            padding:"15px",
            //color:"#496F46",
            fontSize:"14px",
            resize:"none"
          }}>
            
          </textarea>

          <div style={{width:"100%"}}>
            <FormControlLabel control={<Checkbox checked={isChecked} sx={{
                color: "#496F46",
                '&.Mui-checked': {
                    color: "#496F46"
                }
                }}/>} onChange={CheckedHandler} label="동의합니다." />
          </div>

          {/* checkbox 체크시 버튼 활성화 초반에는 비활성*/}
          <Button  onClick={navigateToJoin} disabled={!isChecked} sx={{
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

export default Auth(TermsPage, false);