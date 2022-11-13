import React from 'react';
import { useNavigate } from "react-router-dom";
import {Box,Button,Checkbox,FormGroup,FormControlLabel, styled} from '@mui/material';
import Auth from '../../hoc/Auth';

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
    // const [isChecked, setisChecked] = useState(false);

    // const CheckedHandler = (checked) => {
        
    //   };

    const navigate = useNavigate(null);
 
    const navigateToJoin = () => {
        navigate("/join");
    };


    return (
      <StyledLoginBox>
          <h1 sx={{ color: "#496F46" }}>
            회원가입
          </h1>
          
          <textarea style={{
            width:"100%",
            height:"500px",
            border:"1px solid #496F46",
            borderRadius:"20px",
            padding:"15px",
            //color:"#496F46",
            fontSize:"18px",
            resize:"none"
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </textarea>

          <div style={{width:"100%"}}>
            <FormGroup sx={{width:"50%clear"}}>
                <FormControlLabel control={<Checkbox sx={{
                color: "#496F46",
                '&.Mui-checked': {
                    color: "#496F46"
                }
                }}/>} label="동의합니다." />
            </FormGroup>
          </div>

          {/* checkbox 체크시 버튼 활성화 초반에는 비활성*/}
          <Button  onClick={navigateToJoin} sx={{
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