import React,{useState} from 'react';
import MenuTitle from '../../components/MenuTitle';
import Auth from '../../hoc/Auth';
import { Button, Grid } from '@mui/material';
import MyPageInfoItem from './Sections/MyPageInfoItem';
import { useNavigate } from "react-router-dom";


const MyPage = () =>{
  const navigate = useNavigate(null);
  const [title, setTitle] = useState("마이페이지");


  const GoToEdit = () => {
    navigate("/mypage/edit");
  }

  return (
    <div>
      <MenuTitle title={title} subText={"계정 정보를 관리합니다."} sx={{mb:"10px"}} subTextSx={{mb:"10px"}}/>
      <MyPageInfoItem SectionName={"아이디"} SectionContent={"egg"} sx={{mt:"59px"}} />
      <MyPageInfoItem SectionName={"이름"} SectionContent={"홍길동"} />
      <MyPageInfoItem SectionName={"생년월일"} SectionContent={"2000-01-08"} />
      <MyPageInfoItem SectionName={"휴대폰 번호"} SectionContent={"010-0000-0000"} />
      <MyPageInfoItem SectionName={"이메일"} SectionContent={"hello@naver.com"} />
      <MyPageInfoItem SectionName={"권한"} SectionContent={"이벤트 참여자"} />
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button color="red" sx={{ width: 160 }}>
          탈퇴
        </Button>
        <Button sx={{ width: 200, ml: 2 }}  onClick={GoToEdit}>
          수정
        </Button>
      </Grid>
    </div>
  );
};

export default Auth(MyPage, true);

