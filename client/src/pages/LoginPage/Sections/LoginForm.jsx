import React, { useCallback, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../store/actions/user_actions";
import AlertDialog from "../../../components/AlertDialog";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [openAlertError, setOpenAlertError] = useState(false);

  const onChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let body = {
      userId: userId,
      password: password,
    };

    //로그인 액션
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        setOpenAlertError(true);
      }
    });
  };

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField label="아이디" value={userId} onChange={onChangeUserId} />
      <TextField
        value={password}
        onChange={onChangePassword}
        type="password"
        label="비밀번호"
        sx={{ mt: 2.5 }}
      />
      <Button
        type="submit"
        sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4,
        }}
        fullWidth
      >
        로그인
      </Button>
      <AlertDialog
        open={openAlertError}
        onClose={onClose}
        title="오류 발생"
        content="로그인에 실패했습니다. 입력 정보를 다시 확인해주세요."
        hideDisagree
      />
    </Box>
  );
};

export default LoginForm;
