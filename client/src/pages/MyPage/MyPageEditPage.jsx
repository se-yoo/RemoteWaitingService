import React, { useState, useEffect, useCallback } from "react";
import MenuTitle from "../../components/MenuTitle";
import Auth from "../../hoc/Auth";
import { Button, Grid, Box, TextField } from "@mui/material";
import MyPageEditItem from "./Sections/MyPageEditItem";
import MyPageInfoItem from "./Sections/MyPageInfoItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mypageUser } from "../../store/actions/user_actions";
import { mypageUserEdit } from "../../store/actions/user_actions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SectionTitle from "../../components/SectionTitle";
import AlertDialog from "../../components/AlertDialog";

const MyPageEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setpwCheck] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");

  useEffect(() => {
    dispatch(mypageUser()).then((response) => {
      if (response.payload.success) {
        setUserId(response.payload.userId);
        setName(response.payload.name);
        setBirthDay(response.payload.birthDay);
        setPhoneNumber(response.payload.phoneNumber);
        setEmail(response.payload.email);
        setRole(response.payload.role);
      } else {
        setErrorDialogContent("정보 조회에 실패했습니다.");
        setOpenAlertError(true);
      }
    });
  }, [dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();

    let body;
    if (password === "") {
      body = {
        userId: userId,
        name: name,
        birthDay: birthDay,
        phoneNumber: phoneNumber,
        email: email,
      };
    } else {
      body = {
        userId: userId,
        password: password,
        name: name,
        birthDay: birthDay,
        phoneNumber: phoneNumber,
        email: email,
      };
    }

    dispatch(mypageUserEdit(body)).then((response) => {
      if (response.payload.success) {
        setOpenAlertComplete(true);
      } else {
        setErrorDialogContent("정보 수정에 실패했습니다.");
        setOpenAlertError(true);
      }
    });
  };

  const cancleEdit = () => {
    navigate("/mypage");
  };

  let emailValid = "pass";
  let pwValid = "pass";
  let pwCheckValid = "pass";
  let phoneValid = "pass";

  const btnDisabled = () => {
    if (password === "" && pwCheck === "") {
      if (
        emailValid === "pass" &&
        phoneValid === "pass" &&
        userId !== "" &&
        name !== "" &&
        birthDay !== ""
      )
        return false;
      else return true;
    } else {
      if (
        emailValid === "pass" &&
        pwValid === "pass" &&
        pwCheckValid === "pass" &&
        phoneValid === "pass" &&
        userId !== "" &&
        name !== "" &&
        birthDay !== ""
      )
        return false;
      else return true;
    }
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

  const emailValidation = () => {
    let emailCheck = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email === "") return false;
    if (!emailCheck.test(email)) emailValid = "non-pass";
    else emailValid = "pass";

    return !emailCheck.test(email); //true면 오류
  };

  const phoneValidation = () => {
    let phoneCheck = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/; //해당하면 false 리턴

    if (phoneNumber === "") return false;
    if (!phoneCheck.test(phoneNumber)) phoneValid = "non-pass";
    else phoneValid = "pass";

    return !phoneCheck.test(phoneNumber);
  };

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const navigateMyPage = useCallback(() => {
    navigate("/mypage");
  }, []);

  return (
    <Box component="form" onSubmit={onSubmit}>
      <MenuTitle
        title={"마이페이지"}
        subText={"계정 정보를 수정합니다."}
        sx={{ mb: "10px" }}
        subTextSx={{ mb: "10px" }}
      />
      <MyPageEditItem
        onChangeValue={setUserId}
        sectionName={"아이디"}
        sectionContent={userId}
        sx={{ mt: "59px" }}
      />
      <MyPageEditItem
        onChangeValue={setPassword}
        fieldType={"password"}
        sectionName={"비밀번호"}
        sectionContent={password}
        errorCheck={pwValidation()}
        helpertext={"숫자와 영문자를 포함하여 8자이상 입력해주세요"}
      />
      <MyPageEditItem
        onChangeValue={setpwCheck}
        fieldType={"password"}
        sectionName={"비밀번호 확인"}
        sectionContent={pwCheck}
        errorCheck={pwCheckValidation()}
        helpertext={"비밀번호가 다릅니다"}
      />
      <MyPageEditItem
        onChangeValue={setName}
        sectionName={"이름"}
        sectionContent={name}
      />
      {/* <MyPageEditItem onChangeValue={setBirthDay} sectionName={"생년월일"} sectionContent={birthDay} /> */}
      <Box sx={{ mt: "49px" }}>
        <LocalizationProvider sx={{ mt: 2.5 }} dateAdapter={AdapterDayjs}>
          <SectionTitle title={"생년월일"} />
          <DatePicker
            inputFormat={"YYYY-MM-DD"}
            mask={"____-__-__"}
            value={birthDay}
            onChange={(newValue) => {
              setBirthDay(dayjs(newValue).format("YYYY-MM-DD"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <MyPageEditItem
        onChangeValue={setPhoneNumber}
        sectionName={"휴대폰 번호"}
        sectionContent={phoneNumber}
        errorCheck={phoneValidation()}
        helpertext={"형식에 맞지않습니다 -로 구분하여 입력해주세요"}
      />
      <MyPageEditItem
        onChangeValue={setEmail}
        sectionName={"이메일"}
        sectionContent={email}
        errorCheck={emailValidation()}
        helpertext={"이메일 형식이 아닙니다 "}
      />
      <MyPageInfoItem
        sectionName={"권한"}
        sectionContent={role === 0 ? "이벤트 참여자" : "이벤트 관리자"}
      />
      <Grid container justifyContent="end" sx={{ mt: 6 }}>
        <Button color="grey" sx={{ width: 160 }} onClick={cancleEdit}>
          취소
        </Button>
        <Button
          type="submit"
          sx={{ width: 200, ml: 2 }}
          disabled={btnDisabled()}
        >
          수정
        </Button>
      </Grid>
      <AlertDialog
        open={openAlertComplete}
        onClose={navigateMyPage}
        title="수정 완료"
        content="정보가 수정되었습니다."
        hideDisagree
      />
      <AlertDialog
        open={openAlertError}
        onClose={onClose}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </Box>
  );
};

export default Auth(MyPageEditPage, true);
