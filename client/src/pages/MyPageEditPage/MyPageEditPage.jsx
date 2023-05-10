import React, { useState, useEffect, useCallback, useMemo } from "react";
import Auth from "../../hoc/Auth";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadUserDetail,
  resetEmptyUser,
  setUserProperty,
  updateUser,
} from "../../store/actions/user_actions";
import MenuTitle from "../../components/MenuTitle";
import ActionButtons from "../../components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import SectionTitle from "../../components/SectionTitle";
import { ROLE_TYPE_TEXT } from "../../utils/code";
import DateInput from "../../components/DateInput";
import { rules } from "../../utils/resource";
import { checkFormValidation } from "../../utils/function";

const infos = [
  { title: "아이디", value: "userId", readonly: true },
  { title: "비밀번호", value: "password", type: "password" },
  { title: "비밀번호 확인", value: "passwordConfirm", type: "password" },
  { title: "이름", value: "name" },
  { title: "생년월일", value: "birthDay", type: "date" },
  { title: "휴대폰 번호", value: "phoneNumber" },
  { title: "이메일", value: "email" },
];

const validation = {
  userId: { rules: [rules.required] },
  password: {
    rules: [
      (value) => {
        return value === "" || rules.password(value);
      },
    ],
  },
  name: { rules: [rules.required] },
  birthDay: { rules: [rules.required] },
  phoneNumber: { rules: [rules.required, rules.phoneNumber] },
  email: { rules: [rules.required, rules.email] },
};

const MyPageEditPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [errorDialogAgree, setErrorDialogAgree] = useState(() => {});
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [formStatus, setFormStatus] = useState({});
  const [checkRealTime, setCheckRealTime] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editValidation = useMemo(() => {
    return {
      ...validation,
      passwordConfirm: {
        rules: [
          (value) => value === user.password || "비밀번호와 일치하지 않습니다.",
        ],
      },
    };
  }, [user.password]);

  useEffect(() => {
    dispatch(loadUserDetail());
  }, []);

  const onCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const checkEditFormVaildation = useCallback(() => {
    let check = false;

    for (const key of Object.keys(editValidation)) {
      const result = checkFormValidation(user, key, editValidation[key].rules);

      setFormStatus((prevFormStatus) => {
        let newStatus = {};
        newStatus[key] = result !== true ? result : undefined;

        return {
          ...prevFormStatus,
          ...newStatus,
        };
      });

      if (result !== true) {
        check = true;
      }
    }

    return check;
  }, [user, editValidation]);

  useEffect(() => {
    if (checkRealTime) {
      checkEditFormVaildation();
    }
  }, [checkRealTime, user]);

  const navigateMain = useCallback(() => {
    dispatch(resetEmptyUser());
    navigate("/");
  }, []);

  const navigateMyPage = useCallback(() => {
    navigate("/mypage");
  }, []);

  const onClickEdit = useCallback(() => {
    const check = checkEditFormVaildation();

    if (check) {
      setCheckRealTime(true);
      return;
    }

    const body = {
      ...user,
      password: user.password !== "" ? user.password : undefined,
    };

    dispatch(updateUser(body))
      .then((res) => {
        if (res.payload.success) {
          setOpenAlertComplete(true);
        }
      })
      .catch((err) => {
        setErrorDialogAgree(() => onCloseErrorDialog);
        setErrorDialogContent(
          `계정 정보 수정에 실패했습니다. \n오류: ${err.toString()}`,
        );
        setOpenAlertError(true);
      });
  }, [user]);

  const role = useMemo(() => {
    return ROLE_TYPE_TEXT.find((item) => item.value === Number(user.role)).text;
  }, [user.role]);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: navigateMyPage },
      { text: "수정", width: 200, onClick: onClickEdit },
    ];
  }, [onClickEdit]);

  useEffect(() => {
    if (user.error) {
      const { message, error } = user.error;
      setErrorDialogAgree(() => navigateMain);
      setErrorDialogContent(
        `${message} 확인을 누르시면 메인으로 돌아갑니다. \n오류: ${error.toString()}`,
      );
      setOpenAlertError(true);
    }
  }, [user.error]);

  const onChangeUserProperty = useCallback((e) => {
    dispatch(setUserProperty(e.target.name, e.target.value));
  }, []);

  const onChangeUserPropertyDate = useCallback((e) => {
    dispatch(setUserProperty("birthDay", e));
  }, []);

  return (
    <div>
      <MenuTitle title="마이페이지" subText="계정 정보를 수정합니다." />
      {infos.map((info) => (
        <Box key={info.title}>
          <SectionTitle title={info.title} sx={{ mt: 6 }} />
          {info.readonly ? (
            <Box>{user[info.value]}</Box>
          ) : info.type === "date" ? (
            <DateInput
              error={formStatus[info.value] !== undefined}
              helperText={formStatus[info.value]}
              name={info.value}
              value={user[info.value]}
              onChangeValue={onChangeUserPropertyDate}
              sx={{ mt: 2.5, maxWidth: 400 }}
            />
          ) : (
            <TextField
              type={info.type}
              error={formStatus[info.value] !== undefined}
              helperText={formStatus[info.value]}
              name={info.value}
              value={user[info.value]}
              onChange={onChangeUserProperty}
            />
          )}
        </Box>
      ))}
      <SectionTitle title="권한" sx={{ mt: 6 }} />
      <Box>{role}</Box>
      <ActionButtons
        WrapComponent={Box}
        sx={{ mt: 6, display: "flex", justifyContent: "end" }}
        buttons={buttons}
      />
      <AlertDialog
        open={openAlertComplete}
        onClose={navigateMyPage}
        title="수정 완료"
        content="계정 정보가 수정되었습니다."
        hideDisagree
      />
      <AlertDialog
        open={openAlertError}
        onClose={errorDialogAgree}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </div>
  );
};

export default Auth(MyPageEditPage, true);
