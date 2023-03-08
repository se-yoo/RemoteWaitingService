import React from 'react';
import { Box, styled } from '@mui/material';
import Image from 'mui-image';
import Circle from '../../assets/images/circle_icon.png';

const StyledLoginBox = styled(Box)({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const StyledLogoImage = styled(Image)({
  maxWidth: "130px",
  marginTop: "8px",
  marginBottom: "36px",

})


const DefaultPage = () => {
  const text = "이 페이지에 연결할 수 없음";

  return (
    <StyledLoginBox>
      <StyledLogoImage
        src={Circle}
        fit="contain"
        duration={0}
      />
      <Box whiteSpace={"pre-line"} sx={{
        textAlign:"center",
        fontWeight: "700",
        fontSize: "32px",
      }}>
        {text}
      </Box>
    </StyledLoginBox>
    
  );
};

export default DefaultPage;