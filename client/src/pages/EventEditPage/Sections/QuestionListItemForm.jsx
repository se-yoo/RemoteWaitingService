import React, { memo, useCallback, useMemo } from 'react';
import { Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventQuestion, updateEventQuestion } from '../../../store/actions/event_actions';
import { ANSWER_TYPE, ANSWER_TYPE_TEXT } from '../../../utils/code';
import QuestionListItemFormOption from './QuestionListItemFormOption';

const QuestionListItemForm = memo((props) => {
  const { idx } = props;
  const question = useSelector(state => state.event.questions[idx]);
  const { answerType, required } = question;
  const dispatch = useDispatch();

  const onClickDelete = useCallback(() => {
    dispatch(deleteEventQuestion(idx));
  }, [idx]);

  const onChangeAnswerType = useCallback((e) => {
    const newValue = { answerType: e.target.value };
    dispatch(updateEventQuestion(idx, newValue));
  }, [idx]);

  const onChangeRequired = useCallback((e) => {
    const newValue = { required: e.target.checked };
    dispatch(updateEventQuestion(idx, newValue));
  }, [idx]);

  const onChangeOptions = useCallback((options) => {
    const newValue = { options };
    dispatch(updateEventQuestion(idx, newValue));
  }, [idx]);

  const QuestionOption = useMemo(() => {
    return (
      (answerType === ANSWER_TYPE.RADIO || answerType === ANSWER_TYPE.CHECKBOX) &&
      <QuestionListItemFormOption
        idx={idx}
        onChangeOptions={onChangeOptions}
      />
    );
  }, [answerType, idx]);

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <TextField
            label="문항 이름"
            placeholder="문항 이름을 입력해주세요."
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={onClickDelete}>
            <DeleteOutlineIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid 
        container 
        spacing={2} 
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item xs={3}>
          <FormControl  fullWidth>
            <InputLabel id="type-select-label" selectlabel="true">
              문항 종류
            </InputLabel>
            <Select
              labelId="type-select-label"
              label="문항 종류"
              value={answerType}
              onChange={onChangeAnswerType}
            >
              {ANSWER_TYPE_TEXT.map(type => (
                <MenuItem key={type.value} value={type.value}>{type.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControlLabel
            label="필수값"
            control={
              <Checkbox
                checked={required}
                onChange={onChangeRequired}
              />
            }
          />
        </Grid>
      </Grid>
      {QuestionOption}
    </>
  );
});

export default QuestionListItemForm;