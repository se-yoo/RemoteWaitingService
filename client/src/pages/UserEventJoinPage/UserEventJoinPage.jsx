import React, { useState }  from 'react';
import { Checkbox,FormControlLabel, Grid, Button, Box } from '@mui/material';
import UserEventBasicInfo from '../UserEventDetailPage/Sections/UserEventBasicInfo';
import MenuTitle from '../../components/MenuTitle';
import JoinQuestionList from './Sections/JoinQuestionList';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer } from '../../store/actions/answer_actions';



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
      let body={
        answers:answers,
        writer:userId._id,
        event:eventId
  
      }
      
      dispatch(createAnswer(body))
      .then(response=>{
        if(response.payload.success){
          navigate('/');
          alert('이벤트 참여 완료');
        }
        else{
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

export default UserEventJoinPage;