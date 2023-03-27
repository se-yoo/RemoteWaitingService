import React, { useCallback, useState } from "react";
import { TextField, Button, Box, styled } from "@mui/material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Auth from "../../../hoc/Auth";
import { ROLE_TYPE } from "../../../utils/code";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/actions/user_actions";
import AlertDialog from "../../../components/AlertDialog";

const StyledLoginBox = styled(Box)({
  maxWidth: "440px",
  width: "80%",
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const JoinPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setpwCheck] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  let emailValid = "non-pass";
  let pwValid = "non-pass";
  let pwCheckValid = "non-pass";
  let phoneValid = "non-pass";

  const btnDisabled = () => {
    if (
      emailValid === "pass" &&
      pwValid === "pass" &&
      pwCheckValid === "pass" &&
      phoneValid === "pass" &&
      userID !== "" &&
      name !== "" &&
      birthDay !== "" &&
      role !== ""
    )
      return false;
    else return true;
  };

  const emailValidation = () => {
    let emailCheck = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email === "") return false;
    if (!emailCheck.test(email)) emailValid = "non-pass";
    else emailValid = "pass";

    return !emailCheck.test(email); //true면 오류
  };

  const pwValidation = () => {
    let pwCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password === "") return false;
    if (!pwCheck.test(password)) pwValid = "non-pass";
    else pwValid = "pass";

    return !pwCheck.test(password);
  };

  const pwCheckValidation = () => {
    if (pwCheck === "") return false;
    if (!(password === pwCheck)) pwCheckValid = "non-pass";
    else pwCheckValid = "pass";

    return !(password === pwCheck);
  };

  const phoneValidation = () => {
    let phoneCheck = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/; //해당하면 false 리턴

    if (phoneNumber === "") return false;
    if (!phoneCheck.test(phoneNumber)) phoneValid = "non-pass";
    else phoneValid = "pass";

    return !phoneCheck.test(phoneNumber);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userId: userID,
      password: password,
      name: name,
      birthDay: birthDay,
      phoneNumber: phoneNumber,
      email: email,
      role: role,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        setOpenAlertComplete(true);
      } else {
        setOpenAlertError(true);
      }
    });
  };

  const handleClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const navigateLogin = useCallback(() => {
    setOpenAlertComplete(false);
    navigate("/login");
  }, []);

  return (
    <StyledLoginBox component="form" onSubmit={onSubmitHandler}>
      <h1 sx={{ color: "#496F46" }}>회원가입</h1>

      <TextField
        onChange={(e) => setUserID(e.target.value)}
        value={userID}
        label="아이디"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="비밀번호"
        type="password"
        sx={{ mt: 2.5 }}
        error={pwValidation()}
        helperText={
          pwValidation() ? "숫자와 영문자를 포함하여 8자이상 입력해주세요" : ""
        }
      />
      <TextField
        onChange={(e) => setpwCheck(e.target.value)}
        value={pwCheck}
        label="비밀번호확인"
        type="password"
        sx={{ mt: 2.5 }}
        error={pwCheckValidation()}
        helperText={pwCheckValidation() ? "비밀번호가 다릅니다" : ""}
      />
      <TextField
        onChange={(e) => setName(e.target.value)}
        value={name}
        label="이름"
        sx={{ mt: 2.5 }}
      />
      <LocalizationProvider sx={{ mt: 2.5 }} dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat={"YYYY-MM-DD"}
          mask={"____-__-__"}
          label="생년월일"
          value={birthDay}
          onChange={(newValue) => {
            setBirthDay(dayjs(newValue).format("YYYY-MM-DD"));
          }}
          renderInput={(params) => <TextField sx={{ mt: 2.5 }} {...params} />}
        />
      </LocalizationProvider>
      <TextField
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        label="휴대폰번호"
        sx={{ mt: 2.5 }}
        error={phoneValidation()}
        helperText={
          phoneValidation()
            ? "형식에 맞지않습니다 -로 구분하여 입력해주세요"
            : ""
        }
      />
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="이메일"
        sx={{ mt: 2.5 }}
        error={emailValidation()}
        helperText={emailValidation() ? "이메일 형식이 아닙니다 " : ""}
      />

      <FormControl sx={{ float: "left", width: "100%", mt: 2.5 }}>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          onChange={(e) => setRole(e.target.value)}
        >
          <FormControlLabel
            value={ROLE_TYPE.EVENT_MANAGER}
            sx={{ width: "50%" }}
            control={<Radio sx={{ color: "#496F46" }} />}
            label="이벤트 관리자"
          />
          <FormControlLabel
            value={ROLE_TYPE.EVENT_PARTICIPANT}
            control={<Radio sx={{ color: "#496F46" }} />}
            label="이벤트 참여자"
          />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4,
        }}
        fullWidth
        disabled={btnDisabled()}
      >
        회원가입
      </Button>
      <AlertDialog
        open={openAlertComplete}
        onClose={navigateLogin}
        title="회원가입 성공"
        content="가입을 축하합니다! 로그인 후 이용해주세요."
        hideDisagree
      />
      <AlertDialog
        open={openAlertError}
        onClose={handleClose}
        title="오류 발생"
        content="회원가입에 실패했습니다."
        hideDisagree
      />
    </StyledLoginBox>
  );
};

export default Auth(JoinPage, false);
