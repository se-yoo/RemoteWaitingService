import React, { useCallback, useState } from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import Image from "mui-image";
import Logo from "../assets/images/logo.png";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import OutputIcon from "@mui/icons-material/Output";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/actions/user_actions";
import AlertDialog from "../components/AlertDialog";

const iconStyle = {
  width: "30px",
  height: "30px",
  color: "#496F46",
};

const LayoutHeader = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const loginData = useSelector((state) => state.user.loginData);
  const { isAuth } = loginData || { isAuth: false };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogo = useCallback(() => {
    navigate("/");
  }, []);

  const onClickMyPage = useCallback(() => {
    navigate("/mypage");
  }, []);

  //로그아웃
  const onClickLogout = useCallback(() => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        setOpenAlertError(true);
      }
    });
  }, []);

  const onClickLogin = useCallback(() => {
    navigate("/login");
  }, []);

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: "0px 4px 10px 2px rgba(73, 111, 70, 0.12)" }}
    >
      <Toolbar
        sx={{
          background: "#FFFFFF",
          height: "100px",
        }}
      >
        <Image
          src={Logo}
          width="100px"
          fit="contain"
          bgColor="transparent"
          duration={0}
          className="cursor-pointer"
          onClick={onClickLogo}
        />
        <Box sx={{ flexGrow: 1 }} />
        {isAuth ? (
          <>
            <IconButton onClick={onClickMyPage}>
              <PermIdentityIcon sx={iconStyle} />
            </IconButton>
            <IconButton sx={{ ml: "8px" }} onClick={onClickLogout}>
              <OutputIcon sx={iconStyle} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={onClickLogin}>
              <AccountCircleOutlinedIcon sx={iconStyle} />
            </IconButton>
          </>
        )}
      </Toolbar>
      <AlertDialog
        open={openAlertError}
        onClose={onClose}
        title="오류 발생"
        content="로그아웃에 실패했습니다."
        hideDisagree
      />
    </AppBar>
  );
};

export default LayoutHeader;
