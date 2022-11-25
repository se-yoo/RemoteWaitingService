import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, ListItem, Radio, RadioGroup, TextareaAutosize } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ANSWER_TYPE } from '../../../utils/code';
import {TextField } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyledQuestionListItem = styled(ListItem)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "40px 32px"
});

const QuestionListItem = (props) => {
  const { question, index, answerItem, onChangeItem, itemRequired,  onChangeItemRequired} = props;
  const { answerType, options } = question;

  
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{
    let newRequired=itemRequired;

    newRequired[index-1]=question.required;
    onChangeItemRequired(newRequired);
    //console.log(newRequired)

  },[onChangeItemRequired])

  const phoneValidation = () => {
    let phoneCheck = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/; //해당하면 false 리턴
    
    if(phoneNumber==="") return false;

    return !phoneCheck.test(phoneNumber); 
  }

  const emailValidation = () => {
    let emailCheck = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if(email==="") return false;

    return !emailCheck.test(email); //true면 오류
  }
  
  const onChangeAnswerItems = useCallback((e, arrIndex, flag) => {
    let newArr = answerItem;
    switch(flag){
      case ANSWER_TYPE.TEXT_TELNO:
        setPhoneNumber(e.target.value);
        newArr[arrIndex]=e.target.value;
        break;
      case ANSWER_TYPE.TEXT_EMAIL:
        setEmail(e.target.value);
        newArr[arrIndex]=e.target.value;
        break;
      case ANSWER_TYPE.DATE:
        newArr[arrIndex]=dayjs(e).format("YYYY-MM-DD");
        break;
      default:
        newArr[arrIndex]=e.target.value;
        break;
    }
    onChangeItem(newArr);
    //console.log("...answerItem "+newArr);
  },[onChangeItem]);

  return (
    <Grid 
      container 
      component={StyledQuestionListItem}
      alignItems="start"
    >
      <Grid item xs="auto" sx={{ fontWeight: 700, pr: 3 }}>
        {index}
      </Grid>
      <Grid item xs>
        <Box className={{ required: question.required }}>
          {question.question}
        </Box>
        {answerType === ANSWER_TYPE.TEXT && (
          <Box mt={2} color="grey">
            <TextField onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.TEXT)} placeholder={`${question.question}을 입력하세요`} />
          </Box>
        )}
        {answerType === ANSWER_TYPE.TEXT_TELNO && (
          <Box mt={2} color="grey">
            <TextField onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.TEXT_TELNO)} placeholder={`${question.question}을 입력하세요`} 
              error={phoneValidation()} helperText={phoneValidation() ? "형식에 맞지않습니다 -로 구분하여 입력해주세요":""} />
      
          </Box>
        )}
        {answerType === ANSWER_TYPE.TEXT_EMAIL && (
          <Box mt={2} color="grey">
            <TextField onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.TEXT_EMAIL)} placeholder={`${question.question}을 입력하세요`} 
              error={emailValidation()} helperText={emailValidation() ? "이메일 형식이 아닙니다 ":""}/>
          </Box>
        )}
        {answerType === ANSWER_TYPE.TEXTAREA && (
          <Box mt={2} color="grey">
            <TextareaAutosize onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.TEXTAREA)} placeholder={`${question.question}을 입력하세요`} />
          </Box>
        )}
        {answerType === ANSWER_TYPE.DATE && (
          <Box mt={2} color="grey">
            <LocalizationProvider sx={{ mt: 2.5 }} dateAdapter={AdapterDayjs}>
              <DatePicker inputFormat={"YYYY-MM-DD"} mask={'____-__-__'}
                placeholder={`${question.question}을 입력하세요`}
                value={birthDay}
                onChange={(newValue) => {
                  setBirthDay(dayjs(newValue).format("YYYY-MM-DD"));
                  onChangeAnswerItems(newValue,index-1,ANSWER_TYPE.DATE);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        )}
        {answerType === ANSWER_TYPE.RADIO && (
          <RadioGroup sx={{ mt: 2 }} onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.RADIO)}>
            {options.map(option => (
              <FormControlLabel
                value={option.value}
                control={<Radio disableRipple={true}/>}
                label={option.text}
              />
            ))}
          </RadioGroup>
        )}
        {answerType === ANSWER_TYPE.CHECKBOX && (
          <FormGroup sx={{ mt: 2 }} onChange={(e)=>onChangeAnswerItems(e,index-1,ANSWER_TYPE.CHECKBOX)}>
            {options.map(option => (
              <FormControlLabel
                value={option.value}
                control={<Checkbox disableRipple={true} />}
                label={option.text}
              />
            ))}
          </FormGroup>
        )}
      </Grid>
    </Grid>
  );
};

export default QuestionListItem;