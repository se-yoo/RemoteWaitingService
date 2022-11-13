import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import { setEventOptionCd } from '../../../store/actions/event_actions';
import { EVENT_OPTION_TEXT } from '../../../utils/code';

const EditOption = (props) => {
  const optionCd = useSelector(state => state.event.optionCd);
  const { sx } = props;
  const dispatch = useDispatch();

  const onChangeOptionCd = useCallback((e) => {
    dispatch(setEventOptionCd(e.target.value));
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 옵션" />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="option-select-label" selectlabel="true">
          이벤트 옵션
        </InputLabel>
        <Select
          labelId="option-select-label"
          label="이벤트 옵션"
          value={optionCd}
          onChange={onChangeOptionCd}
          sx={{ maxWidth: 370 }}
        >
          {EVENT_OPTION_TEXT.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EditOption;