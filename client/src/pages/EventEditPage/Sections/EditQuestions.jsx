import { Box, Button, FormHelperText } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addEventQuestion } from '../../../store/actions/event_actions';
import SectionTitle from '../../../components/SectionTitle';
import QuestionList from './QuestionList';

const EditQuestions = memo((props) => {
  const { sx, formStatus } = props;
  const dispatch = useDispatch();

  const onClickQuestionAdd = useCallback(() => {
    dispatch(addEventQuestion());
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 문항" />
      <QuestionList />
      <Button
        type="translucent"
        sx={{
          fontSize: 24,
          fontWeight: 400
        }}
        fullWidth
        onClick={onClickQuestionAdd}
      >
        + 항목 추가
      </Button>
      {formStatus && (
        <FormHelperText error sx={{mt: 1, ml: 2}}>
          {formStatus}
        </FormHelperText>
      )}
    </Box>
  );
});

export default EditQuestions;