import styled from "@emotion/styled";
import { Box, Grid, ListItem } from "@mui/material";
import React, { memo, useMemo } from "react";
import { ANSWER_TYPE } from "../utils/code";

const StyledAnswerListItem = styled(ListItem)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "16px 24px",
});

const AnswerListItem = memo((props) => {
  const { question, answer, index, hideRequired } = props;

  const answerText = useMemo(() => {
    switch (question.answerType) {
      case ANSWER_TYPE.TEXT:
      case ANSWER_TYPE.TEXT_PHONE_NUMBER:
      case ANSWER_TYPE.TEXT_EMAIL:
      case ANSWER_TYPE.TEXTAREA:
      case ANSWER_TYPE.DATE:
        return answer;
      case ANSWER_TYPE.RADIO: {
        const answerOption = question.options.find(
          (option) => option.value === Number(answer),
        );
        return answerOption ? answerOption.text : "알 수 없음";
      }
      case ANSWER_TYPE.CHECKBOX: {
        const answerArray = typeof answer === "object" ? answer : [answer];
        const answers = question.options.filter((option) =>
          answerArray.includes(option.value),
        );
        return answers.map((answer) => answer.text).join(", ");
      }
      default:
        return answer;
    }
  }, [question, answer]);

  return (
    <Grid container component={StyledAnswerListItem} alignItems="start">
      <Grid item xs="auto" sx={{ fontWeight: 700, pr: 3 }}>
        {index}
      </Grid>
      <Grid item xs>
        <Box className={{ required: !hideRequired && question.required }}>
          {question.question}
        </Box>
        <Box pt={1}>{answerText}</Box>
      </Grid>
    </Grid>
  );
});

AnswerListItem.defaultProps = {
  hideRequired: false,
};

export default AnswerListItem;
