import React from 'react';
import { useNavigate } from "react-router-dom";
import {Box,Button,Checkbox,FormGroup,FormControlLabel} from '@mui/material';

// const btn_style={
//     marginTop:"5px",
//     marginBottom:"5px",
//     width:"100%",
//     height:"56px",
//     padding:0,
//     borderRadius:100,
//     border:0,
//     color:"white",
//     background:"#496F46",
//     fontSize:"15px",
//     fontWeight:"bold"
//   }


const TermsPage = () => {

    // const [isChecked, setisChecked] = useState(false);

    // const CheckedHandler = (checked) => {
        
    //   };

    const navigate = useNavigate(null);
 
    const navigateToJoin = () => {
        navigate("/join");
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
          <h1 style={{color:"#496F46"}}>회원가입</h1>
          
          <textarea style={{
            width:"100%",
            height:"380px",
            border:"1px solid #496F46",
            borderRadius:"20px",
            padding:"15px",
            //color:"#496F46",
            fontSize:"14px",
            resize:"none"
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </textarea>

          <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox sx={{
                color: "#496F46",
                '&.Mui-checked': {
                    color: "#496F46"
                }
                }}/>} label="동의합니다." />
            </FormGroup>
          </div>

          {/* checkbox 체크시 버튼 활성화 초반에는 비활성*/}
          <Button  onClick={navigateToJoin}>
            회원가입
          </Button>
        </Box>
        
      );
};


export default TermsPage;