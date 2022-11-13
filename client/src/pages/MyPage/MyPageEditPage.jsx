import React,{useState} from 'react';
import MenuTitle from '../../components/MenuTitle';
import Auth from '../../hoc/Auth';
import { Button, Grid, Box } from '@mui/material';
import MyPageEditItem from './Sections/MyPageEditItem';
import MyPageInfoItem from './Sections/MyPageInfoItem';
import { useNavigate } from "react-router-dom";

const MyPageEditPage = () =>{
  const navigate = useNavigate(null);

  const [userID, setUserID] = useState("eeeee");
  const [name, setName] = useState("홍홍홍");
  const [birthDay, setBirthDay] = useState("2000-01-08");
  const [phoneNumber, setPhoneNumber] = useState("010-0000-0000");
  const [email, setEmail] = useState("hello@naver.com");


  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('UserID',userID);
    console.log('Name',name);
    console.log('BirthDay',birthDay);
    console.log('PhoneNumber',phoneNumber);
    console.log('Email',email);
  }

  const cancleEdit = () => {
    navigate("/mypage");
  }

  return (
    <Box component="form" onSubmit={onSubmitHandler}>
      <MenuTitle title={"마이페이지"} subText={"계정 정보를 수정합니다."} sx={{mb:"10px"}} subTextSx={{mb:"10px"}}/>
      <MyPageEditItem onChangeValue={setUserID} sectionName={"아이디"} sectionContent={userID} sx={{mt:"59px"}} />
      <MyPageEditItem onChangeValue={setName} sectionName={"이름"} sectionContent={name} />
      <MyPageEditItem onChangeValue={setBirthDay} sectionName={"생년월일"} sectionContent={birthDay} />
      <MyPageEditItem onChangeValue={setPhoneNumber} sectionName={"휴대폰 번호"} sectionContent={phoneNumber} />
      <MyPageEditItem onChangeValue={setEmail} sectionName={"이메일"} sectionContent={email} />
      <MyPageInfoItem sectionName={"권한"} sectionContent={"이벤트 참여자"} />
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button color="grey" sx={{ width: 160 }} onClick={cancleEdit} >
          취소
        </Button>
        <Button type="submit" sx={{ width: 200, ml: 2 }}>
          수정
        </Button>
      </Grid>
    </Box>
  );
};

export default Auth(MyPageEditPage, true);
