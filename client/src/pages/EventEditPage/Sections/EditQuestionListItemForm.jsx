import React, { memo, useCallback, useMemo } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventQuestion,
  updateEventQuestion,
} from "../../../store/actions/event_actions";
import { ANSWER_TYPE, ANSWER_TYPE_TEXT } from "../../../utils/code";
import EditQuestionListItemFormOption from "./EditQuestionListItemFormOption";

const EditQuestionListItemForm = memo((props) => {
  const { index } = props;
  const questionInfo = useSelector((state) => state.event.questions[index]);
  const { question, answerType, required } = questionInfo;
  const dispatch = useDispatch();

  const onClickDelete = useCallback(() => {
    dispatch(deleteEventQuestion(index));
  }, [index]);

  const onChangeQuestion = useCallback(
    (e) => {
      const newValue = { question: e.target.value };
      dispatch(updateEventQuestion(index, newValue));
    },
    [index],
  );

  const onChangeAnswerType = useCallback(
    (e) => {
      const newAnswerType = e.target.value;
      let newOptions = undefined;

      if (
        newAnswerType === ANSWER_TYPE.CHECKBOX ||
        newAnswerType === ANSWER_TYPE.RADIO
      ) {
        newOptions = [{ value: 1, text: "새로운 답변" }];
      }

      const newValue = {
        answerType: newAnswerType,
        options: newOptions,
      };
      dispatch(updateEventQuestion(index, newValue));
    },
    [index],
  );

  const onChangeRequired = useCallback(
    (e) => {
      const newValue = { required: e.target.checked };
      dispatch(updateEventQuestion(index, newValue));
    },
    [index],
  );

  const onChangeOptions = useCallback(
    (options) => {
      const newValue = { options };
      dispatch(updateEventQuestion(index, newValue));
    },
    [index],
  );

  const QuestionOption = useMemo(() => {
    return (
      (answerType === ANSWER_TYPE.RADIO ||
        answerType === ANSWER_TYPE.CHECKBOX) && (
        <EditQuestionListItemFormOption
          index={index}
          onChangeOptions={onChangeOptions}
        />
      )
    );
  }, [answerType, index]);

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <TextField
            label="문항 이름"
            placeholder="문항 이름을 입력해주세요."
            value={question}
            onChange={onChangeQuestion}
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={onClickDelete}>
            <DeleteOutlineIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="type-select-label" selectlabel="true">
              문항 종류
            </InputLabel>
            <Select
              labelId="type-select-label"
              label="문항 종류"
              value={answerType}
              onChange={onChangeAnswerType}
            >
              {ANSWER_TYPE_TEXT.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControlLabel
            label="필수값"
            control={
              <Checkbox checked={required} onChange={onChangeRequired} />
            }
          />
        </Grid>
      </Grid>
      {QuestionOption}
    </>
  );
});

export default EditQuestionListItemForm;
