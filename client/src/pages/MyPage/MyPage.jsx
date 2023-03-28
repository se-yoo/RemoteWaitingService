import React, { useState, useEffect, useCallback } from "react";
import MenuTitle from "../../components/MenuTitle";
import Auth from "../../hoc/Auth";
import { Button, Grid } from "@mui/material";
import MyPageInfoItem from "./Sections/MyPageInfoItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mypageUser } from "../../store/actions/user_actions";
import AlertDialog from "../../components/AlertDialog";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [openAlertError, setOpenAlertError] = useState(false);

  const navigateEdit = () => {
    navigate("/mypage/edit");
  };

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
        setOpenAlertError(true);
      }
    });
  }, [dispatch]);

  const onClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  return (
    <div>
      <MenuTitle
        title={"마이페이지"}
        subText={"계정 정보를 관리합니다."}
        sx={{ mb: "10px" }}
        subTextSx={{ mb: "10px" }}
      />
      <MyPageInfoItem
        sectionName={"아이디"}
        sectionContent={userId}
        sx={{ mt: "59px" }}
      />
      <MyPageInfoItem sectionName={"이름"} sectionContent={name} />
      <MyPageInfoItem sectionName={"생년월일"} sectionContent={birthDay} />
      <MyPageInfoItem
        sectionName={"휴대폰 번호"}
        sectionContent={phoneNumber}
      />
      <MyPageInfoItem sectionName={"이메일"} sectionContent={email} />
      <MyPageInfoItem
        sectionName={"권한"}
        sectionContent={role === 0 ? "이벤트 참여자" : "이벤트 관리자"}
      />
      <Grid container justifyContent="end" sx={{ mt: 6 }}>
        <Button color="red" sx={{ width: 160 }}>
          탈퇴
        </Button>
        <Button sx={{ width: 200, ml: 2 }} onClick={navigateEdit}>
          수정
        </Button>
      </Grid>
      <AlertDialog
        open={openAlertError}
        onClose={onClose}
        title="오류 발생"
        content="정보 조회에 실패했습니다."
        hideDisagree
      />
    </div>
  );
};

export default Auth(MyPage, true);
