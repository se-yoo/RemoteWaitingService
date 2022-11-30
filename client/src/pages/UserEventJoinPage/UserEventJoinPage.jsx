import React, { useState }  from 'react';
import { Checkbox,FormControlLabel, Grid, Button, Box } from '@mui/material';
import UserEventBasicInfo from '../UserEventDetailPage/Sections/UserEventBasicInfo';
import MenuTitle from '../../components/MenuTitle';
import JoinQuestionList from './Sections/JoinQuestionList';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer, guestCreateAnswer } from '../../store/actions/answer_actions';
import Auth from '../../hoc/Auth';



const UserEventJoinPage = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setisChecked] = useState(false);
  const [answers, setAnswers]=useState([]);
  const eventId = useParams().eventId;
  const userId = useSelector(state => state.user.userData);
  const [inputRequired, setInputRequired] = useState([]);

  

  const CheckedHandler = () => {
      setisChecked(!isChecked);
  };

  const requiredChecked = () =>{
    let requiredResult = null;

    inputRequired.map((item,index)=>(
      item ? ((answers[index]===undefined||answers[index]==="") ?(requiredResult=false):""):""
    ))

    if(requiredResult==null) requiredResult=true;

    return requiredResult;
  }

  const btnDisabled = () => {
    if(isChecked===true) return false;
    else return true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(requiredChecked()){
      //console.log("requiredChecked pass")
      let loginUser = userId._id
      if(loginUser===undefined){
        console.log("loginUser : "+loginUser); 
        loginUser=null;
      }
      let body={
        answers:answers,
        writer:loginUser,
        event:eventId
  
      }
      
      dispatch(createAnswer(body))
      .then(response=>{
        if(response.payload.success){
          if(response.payload.writer!==null){
            navigate('/');
            alert('이벤트 참여 완료');
            console.log("event : "+response.payload.event);
            console.log("writer : "+response.payload.writer);
          }
          else{
            console.log("_id : "+response.payload._id);
            let questId={
              writer:response.payload._id
            }
            dispatch(guestCreateAnswer(questId))
            .then(response=>{
              if(response.payload.success){
                navigate("/guest/event/detail/"+response.payload.eventId+"/"+response.payload.guestId);
                console.log("guest guestId : "+response.payload.guestId);
                console.log("guest eventId : "+response.payload.eventId);
                alert("비회원 참여완료")
              }
              else{
                console.log("err : "+JSON.stringify(response.payload.err));
                alert('Error!');
              }
            })
          }
          
        }
        else{
          console.log("err : "+JSON.stringify(response.payload.err));
          alert('Error!');
        }
      })

      // console.log("answers "+body.answers);
      // console.log("writer "+body.writer);
      // console.log("event "+body.event);
    }
    else{
      alert("필수입력값을 입력하세요");
      //console.log("requiredChecked non-pass")
    }
    
    
  }

  

  return(
    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{ 
        width: {
          xs: '100%',
          md: '80%',
          xl: '70%'
        },
        margin: {
          xs: '16px',
          sm: '32px',
          md: '32px auto',
          xl: '70px auto'
        }
      }}
    >
      <MenuTitle title={"이벤트 참여"} />
      <UserEventBasicInfo />
      <JoinQuestionList value={answers} onChangeAnswer={setAnswers} required={inputRequired} onChangeRequired={setInputRequired}  />
      <FormControlLabel control={<Checkbox checked={isChecked} sx={{
          color: "#496F46",
          '&.Mui-checked': {
            color: "#496F46"
          }
        }}/>} 
        onChange={CheckedHandler} label="개인정보 수집 이용에 동의합니다." 
      />

      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button type='submit' disabled={btnDisabled()} sx={{ width: 200, ml: 2 }}>
          참여
        </Button>
      </Grid>
    </Box>
  );
};

export default Auth(UserEventJoinPage,null);