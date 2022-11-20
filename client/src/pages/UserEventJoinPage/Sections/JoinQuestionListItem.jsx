import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, ListItem, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { ANSWER_TYPE } from '../../../utils/code';
import {TextField } from '@mui/material';

const StyledQuestionListItem = styled(ListItem)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "40px 32px"
});

const QuestionListItem = (props) => {
  const { question, index } = props;
  const { answerType, options } = question;
  
  const [text, setText ] = useState("");
  const [isRadioChecked, setIsRadioChecked]=useState("");
  const [isCheckBoxChecked, setIsCheckBoxChecked]=useState("");


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
            <TextField onChange={(e)=>setText(e.target.value)} value={text} placeholder={`${question.question}을 입력하세요`} />
          </Box>
        )}
        {answerType === ANSWER_TYPE.RADIO && (
          <RadioGroup sx={{ mt: 2 }} onChange={(e)=>setIsRadioChecked(e.target.value)}>
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
          <FormGroup sx={{ mt: 2 }} onChange={(e)=>setIsCheckBoxChecked(e.target.value)}>
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