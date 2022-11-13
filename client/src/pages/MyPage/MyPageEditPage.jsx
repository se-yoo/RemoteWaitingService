import React,{useState} from 'react';
import MenuTitle from '../../components/MenuTitle';
import Auth from '../../hoc/Auth';
import { Button, Grid, Box } from '@mui/material';
import MyPageEditItem from './Sections/MyPageEditItem';
import MyPageInfoItem from './Sections/MyPageInfoItem';
import { useNavigate } from "react-router-dom";

const MyPageEditPage = () =>{
  const navigate = useNavigate(null);

  const [title, setTitle] = useState("마이페이지");
  const [UserID, setUserID] = useState("egg");
  const [Name, setName] = useState("홍길동");
  const [BirthDay, setBirthDay] = useState("2000-01-08");
  const [PhoneNumber, setPhoneNumber] = useState("010-0000-0000");
  const [Email, setEmail] = useState("hello@naver.com");


  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('UserID',UserID);
    console.log('Name',Name);
    console.log('BirthDay',BirthDay);
    console.log('PhoneNumber',PhoneNumber);
    console.log('Email',Email);
  }

  const CancleEdit = () => {
    navigate("/mypage");
  }

  return (
    <Box component="form" onSubmit={onSubmitHandler}>
      <MenuTitle title={title} subText={"계정 정보를 수정합니다."} sx={{mb:"10px"}} subTextSx={{mb:"10px"}}/>
      <MyPageEditItem onChangeValue={setUserID} SectionName={"아이디"} SectionContent={UserID} sx={{mt:"59px"}} />
      <MyPageEditItem onChangeValue={setName} SectionName={"이름"} SectionContent={Name} />
      <MyPageEditItem onChangeValue={setBirthDay} SectionName={"생년월일"} SectionContent={BirthDay} />
      <MyPageEditItem onChangeValue={setPhoneNumber} SectionName={"휴대폰 번호"} SectionContent={PhoneNumber} />
      <MyPageEditItem onChangeValue={setEmail} SectionName={"이메일"} SectionContent={Email} />
      <MyPageInfoItem SectionName={"권한"} SectionContent={"이벤트 참여자"} />
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button color="grey" sx={{ width: 160 }} onClick={CancleEdit} >
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
