import React,{useState, useEffect} from 'react';
import MenuTitle from '../../components/MenuTitle';
import Auth from '../../hoc/Auth';
import { Button, Grid } from '@mui/material';
import MyPageInfoItem from './Sections/MyPageInfoItem';
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { mypageUser } from '../../store/actions/user_actions';


const MyPage = () =>{
  const navigate = useNavigate(null);
  const dispatch = useDispatch(null);


  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  const GoToEdit = () => {
    navigate("/mypage/edit");
  }

  useEffect(() => {
    dispatch(mypageUser())
    .then(response => {
      if(response.payload.success){
        setUserID(response.payload.userId);
        setName(response.payload.name);
        setBirthDay(response.payload.birthDay);
        setPhoneNumber(response.payload.phoneNumber);
        setEmail(response.payload.email);
        setRole(response.payload.role);
      }
      else{
        console.log(response.payload.err);
        alert('로드불가 : Error!');
      }
    })
  }, [dispatch]);


  return (
    <div>
      <MenuTitle title={"마이페이지"} subText={"계정 정보를 관리합니다."} sx={{mb:"10px"}} subTextSx={{mb:"10px"}}/>
      <MyPageInfoItem sectionName={"아이디"} sectionContent={userID} sx={{mt:"59px"}} />
      <MyPageInfoItem sectionName={"이름"} sectionContent={name} />
      <MyPageInfoItem sectionName={"생년월일"} sectionContent={birthDay} />
      <MyPageInfoItem sectionName={"휴대폰 번호"} sectionContent={phoneNumber} />
      <MyPageInfoItem sectionName={"이메일"} sectionContent={email} />
      <MyPageInfoItem sectionName={"권한"} sectionContent={role===0?"이벤트 참여자":"이벤트 관리자"} />
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

