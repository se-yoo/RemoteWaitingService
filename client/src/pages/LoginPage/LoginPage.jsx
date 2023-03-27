import React from "react";
import { Box, Link, styled, useTheme } from "@mui/material";
import Image from "mui-image";
import Logo from "../../assets/images/logo.png";
import LoginForm from "./Sections/LoginForm";
import Auth from "../../hoc/Auth";

const StyledLogoImage = styled(Image)({
  width: "50%",
  maxWidth: "230px",
  marginTop: "8px",
  marginBottom: "36px",
});

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Box className="com-center-area">
      <Box sx={{ color: theme.palette.primary.main }}>원격 웨이팅 서비스</Box>
      <StyledLogoImage src={Logo} fit="contain" duration={0} />
      <LoginForm />
      <Box
        sx={{
          fontWeight: 700,
          mt: 4,
        }}
      >
        계정이 없으신가요?&nbsp;
        <Link href="/join" underline="none">
          가입하기
        </Link>
      </Box>
    </Box>
  );
};

export default Auth(LoginPage, false);
