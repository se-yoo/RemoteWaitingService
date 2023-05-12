import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TextField, Box, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { ROLE_TYPE, ROLE_TYPE_TEXT } from "../../../utils/code";
import { rules } from "../../../utils/resource";
import { checkFormValidation } from "../../../utils/function";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/actions/user_actions";
import DateInput from "../../../components/DateInput";
import AlertDialog from "../../../components/AlertDialog";

const validation = {
  userId: { rules: [rules.required] },
  password: { rules: [rules.required, rules.password] },
  name: { rules: [rules.required] },
  birthday: { rules: [rules.required] },
  phoneNumber: { rules: [rules.required, rules.phoneNumber] },
  email: { rules: [rules.required, rules.email] }
};

const JoinForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLE_TYPE.EVENT_PARTICIPANT);
  const [formStatus, setFormStatus] = useState({});
  const [checkRealTime, setCheckRealTime] = useState(false);
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const user = {
    userId,
    password,
    passwordConfirm,
    name,
    birthday,
    phoneNumber,
    email,
    role
  };

  const joinValidation = useMemo(() => {
    return {
      ...validation,
      passwordConfirm: { rules: [(value) => value === password || "비밀번호와 일치하지 않습니다."] }
    }
  }, [password]);

  const onChangeUserId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordConfirm = useCallback((e) => {
    setPasswordConfirm(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangeBirthday = useCallback((date) => {
    setBirthday(date);
  }, []);

  const onChangePhoneNumber = useCallback((e) => {
    setPhoneNumber(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangeRole = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const checkJoinFormVaildation = useCallback(() => {
    let check = false;

    for (const key of Object.keys(joinValidation)) {
      const result = checkFormValidation(user, key, joinValidation[key].rules);

      setFormStatus(prevFormStatus => {
        let newStatus = {};
        newStatus[key] = result !== true ? result : undefined;

        return {
          ...prevFormStatus,
          ...newStatus
        };
      });

      if (result !== true) {
        check = true;
      }
    }

    return check;
  }, [user, joinValidation]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const check = checkJoinFormVaildation();

    if (check) {
      setCheckRealTime(true);
      return;
    }

    dispatch(registerUser(user))
      .then((response) => {
        if (response.payload.success) {
          setOpenAlertComplete(true);
        } else {
          setOpenAlertError(true);
        }
      });
  }, [user]);

  useEffect(() => {
    if (checkRealTime) {
      checkJoinFormVaildation();
    }
  }, [checkRealTime, user]);

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const navigateLogin = useCallback(() => {
    setOpenAlertComplete(false);
    navigate("/login");
  }, []);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        error={formStatus.userId}
        helperText={formStatus.userId}
        label="아이디"
        value={userId}
        onChange={onChangeUserId}
      />
      <TextField
        type="password"
        error={formStatus.password}
        helperText={formStatus.password}
        label="비밀번호"
        value={password}
        onChange={onChangePassword}
        sx={{ mt: 2.5 }}
      />
      <TextField
        type="password"
        error={formStatus.passwordConfirm}
        helperText={formStatus.passwordConfirm}
        label="비밀번호 확인"
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
        sx={{ mt: 2.5 }}
      />
      <TextField
        error={formStatus.name}
        helperText={formStatus.name}
        label="이름"
        value={name}
        onChange={onChangeName}
        sx={{ mt: 2.5 }}
      />
      <DateInput
        error={formStatus.birthday}
        helperText={formStatus.birthday}
        label="생년월일"
        value={birthday}
        onChangeValue={onChangeBirthday}
        sx={{ mt: 2.5 }}
      />
      <TextField
        error={formStatus.phoneNumber}
        helperText={formStatus.phoneNumber}
        label="휴대폰번호"
        value={phoneNumber}
        onChange={onChangePhoneNumber}
        sx={{ mt: 2.5 }}
      />
      <TextField
        error={formStatus.email}
        helperText={formStatus.email}
        label="이메일"
        value={email}
        onChange={onChangeEmail}
        sx={{ mt: 2.5 }}
      />
      <RadioGroup
        row
        value={role}
        sx={{ mt: 2.5 }}
        onChange={onChangeRole}
      >
        {ROLE_TYPE_TEXT.map(type => (
          <FormControlLabel
            key={type.value}
            value={type.value}
            control={<Radio />}
            label={type.text}
          />
        ))}
      </RadioGroup>
      <Button
        type="submit"
        sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4,
        }}
        fullWidth
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
        onClose={onClose}
        title="오류 발생"
        content="회원가입에 실패했습니다."
        hideDisagree
      />
    </Box>
  );
};

export default JoinForm;