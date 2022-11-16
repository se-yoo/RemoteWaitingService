import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, ListItem, Radio, RadioGroup } from '@mui/material';
import React, { useMemo } from 'react';
import { ANSWER_TYPE, ANSWER_TYPE_TEXT } from '../../../utils/code';

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
  
  const answerTypeText = useMemo(() => {
    const type = ANSWER_TYPE_TEXT.find(type => type.value === answerType);
    return type ? type.text : "-";
  }, [question]);

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
        <Box mt={2} color="grey">
          {answerTypeText}
        </Box>
        {answerType === ANSWER_TYPE.RADIO && (
          <RadioGroup sx={{ mt: 2 }}>
            {options.map(option => (
              <FormControlLabel
                key={option.value}
                control={<Radio disableRipple={true} />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        )}
        {answerType === ANSWER_TYPE.CHECKBOX && (
          <FormGroup sx={{ mt: 2 }}>
            {options.map(option => (
              <FormControlLabel
                key={option.value}
                control={<Checkbox disableRipple={true} checked />}
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