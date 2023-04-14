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

  const onChangeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const body = {
      userId,
      password,
    };

    //로그인 액션
    dispatch(loginUser(body))
      .then((response) => {
        if (response.payload.loginSuccess) {
          navigate("/");
        } else {
          setOpenAlertError(true);
        }
      });
  }, [userId, password]);

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        label="아이디"
        value={userId}
        onChange={onChangeUserId}
      />
      <TextField
        type="password"
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
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
