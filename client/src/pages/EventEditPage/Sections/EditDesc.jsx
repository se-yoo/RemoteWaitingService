import { Box, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import { setEventDescription } from '../../../store/actions/event_actions';

const EditDesc = (props) => {
  const description = useSelector(state => state.event.description);
  const { sx } = props;
  const dispatch = useDispatch();

  const onChangeDesc = useCallback((e) => {
    dispatch(setEventDescription(e.target.value));
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 설명" />
      <TextField
        value={description}
        onChange={onChangeDesc}
        multiline
        rows={5}
        placeholder={"이벤트 설명을 작성해주세요."}
      />
    </Box>
  );
};

export default EditDesc;