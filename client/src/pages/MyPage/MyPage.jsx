import React, { useState, useEffect, useCallback, useMemo } from "react";
import Auth from "../../hoc/Auth";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  loadUserDetail,
  resetEmptyUser,
} from "../../store/actions/user_actions";
import MenuTitle from "../../components/MenuTitle";
import AlertDialog from "../../components/AlertDialog";
import ActionButtons from "../../components/ActionButtons";
import SectionTitle from "../../components/SectionTitle";
import { ROLE_TYPE_TEXT } from "../../utils/code";

const infos = [
  { title: "아이디", value: "userId" },
  { title: "이름", value: "name" },
  { title: "생년월일", value: "birthDay" },
  { title: "휴대폰 번호", value: "phoneNumber" },
  { title: "이메일", value: "email" },
];

const MyPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [errorDialogAgree, setErrorDialogAgree] = useState(() => {});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserDetail());
  }, []);

  const role = useMemo(() => {
    return ROLE_TYPE_TEXT.find((item) => item.value === Number(user.role)).text;
  }, [user.role]);

  const navigateEdit = useCallback(() => {
    navigate("/mypage/edit");
  }, []);

  const navigateMain = useCallback(() => {
    dispatch(resetEmptyUser());
    navigate("/");
  }, []);

  const onCloseConfirmDialog = useCallback(() => {
    setOpenConfirmDelete(false);
  }, []);

  const onCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const onClickDeleteAgree = useCallback(() => {
    dispatch(deleteUser())
      .then((res) => {
        if (res.payload.success) {
          navigate(`/login`);
        }
      })
      .catch((err) => {
        setErrorDialogAgree(() => onCloseErrorDialog);
        setErrorDialogContent(
          `계정 삭제에 실패했습니다. \n오류: ${err.toString()}`,
        );
        setOpenAlertError(true);
      });
  }, []);

  const buttons = useMemo(() => {
    return [
      {
        text: "탈퇴",
        color: "red",
        onClick: () => {
          setOpenConfirmDelete(true);
        },
      },
      { text: "수정", width: 200, onClick: navigateEdit },
    ];
  }, []);

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

  return (
    <div>
      <MenuTitle title="마이페이지" subText="계정 정보를 관리합니다." />
      {infos.map((info) => (
        <Box key={info.title}>
          <SectionTitle title={info.title} sx={{ mt: 6 }} />
          <Box>{user[info.value]}</Box>
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
        open={openAlertError}
        onClose={errorDialogAgree}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
      <AlertDialog
        open={openConfirmDelete}
        onClose={onCloseConfirmDialog}
        onAgree={onClickDeleteAgree}
        title="계정 삭제"
        content="정말로 탈퇴하시겠습니까? 계정 삭제 후 복원할 수 없습니다."
      />
    </div>
  );
};

export default Auth(MyPage, true);
