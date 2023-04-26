import React, { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DateInput from "./DateInput";
import { ANSWER_TYPE, ANSWER_TYPE_TEXT } from "../utils/code";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../store/actions/answer_actions";

const StyledQuestionListItem = styled(ListItem)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "40px 32px",
});

const QuestionListItem = (props) => {
  const { question, index, formItem, error, helperText } = props;
  const { answerType, options } = question;
  const answer = useSelector((state) => state.answer.answers[index]);
  const dispatch = useDispatch();

  const answerTypeText = useMemo(() => {
    const type = ANSWER_TYPE_TEXT.find((type) => type.value === answerType);
    return type ? type.text : "-";
  }, [question]);

  const onChangeAnswer = useCallback((e) => {
    const newValue = e.target.value;
    dispatch(setAnswer(index, newValue));
  }, []);

  const onChangeAnswerDate = useCallback((date) => {
    dispatch(setAnswer(index, date));
  }, []);

  const onChangeAnswerCheckBox = useCallback(
    (e) => {
      let newValue = answer ? [...answer] : [];
      const option = Number(e.target.value);

      if (e.target.checked && !newValue.includes(option)) {
        newValue.push(option);
      } else if (!e.target.checked) {
        newValue = newValue.filter((v) => v !== option);
      }
      dispatch(setAnswer(index, newValue));
    },
    [answer],
  );

  useEffect(() => {
    if (answerType === ANSWER_TYPE.CHECKBOX) {
      console.log(Array.isArray(answer) && answer.includes("2"));
    }
  }, [answer, answerType]);

  return (
    <Grid container component={StyledQuestionListItem} alignItems="start">
      <Grid item xs="auto" sx={{ fontWeight: 700, pr: 3 }}>
        {index + 1}
      </Grid>
      <Grid item xs>
        <Box className={{ required: question.required }}>
          {question.question}
        </Box>
        {!formItem ? (
          <Box mt={2} color="grey">
            {answerTypeText}
          </Box>
        ) : (
          <Box mt={2} color="grey">
            {(answerType === ANSWER_TYPE.TEXT ||
              answerType === ANSWER_TYPE.TEXT_EMAIL ||
              answerType === ANSWER_TYPE.TEXT_TELNO) && (
              <TextField
                onChange={onChangeAnswer}
                placeholder={`${question.question}을 입력하세요`}
                value={answer}
                error={error}
                helperText={helperText}
              />
            )}
            {answerType === ANSWER_TYPE.NUMBER && (
              <TextField
                type="number"
                onChange={onChangeAnswer}
                placeholder={`${question.question}을 입력하세요`}
                value={answer}
                error={error}
                helperText={helperText}
              />
            )}
            {answerType === ANSWER_TYPE.TEXTAREA && (
              <TextField
                onChange={onChangeAnswer}
                multiline
                rows={5}
                placeholder={`${question.question}을 입력하세요`}
                error={error}
                helperText={helperText}
              />
            )}
            {answerType === ANSWER_TYPE.DATE && (
              <DateInput
                label={answer ? undefined : question.question}
                value={answer || ""}
                onChangeValue={onChangeAnswerDate}
                error={error}
                helperText={helperText}
              />
            )}
          </Box>
        )}
        {answerType === ANSWER_TYPE.RADIO && (
          <>
            <RadioGroup value={answer} sx={{ mt: 2 }} onChange={onChangeAnswer}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio disableRipple={!formItem} />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText error>{helperText}</FormHelperText>}
          </>
        )}
        {answerType === ANSWER_TYPE.CHECKBOX && (
          <>
            <FormGroup sx={{ mt: 2 }}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Checkbox
                      disableRipple={!formItem}
                      checked={
                        (Array.isArray(answer) &&
                          answer.includes(option.value)) ||
                        answer === option.value
                      }
                      onChange={onChangeAnswerCheckBox}
                    />
                  }
                  label={option.text}
                />
              ))}
            </FormGroup>
            {error && <FormHelperText error>{helperText}</FormHelperText>}
          </>
        )}
      </Grid>
    </Grid>
  );
};

QuestionListItem.defaultProps = {
  formItem: false,
};

export default QuestionListItem;
