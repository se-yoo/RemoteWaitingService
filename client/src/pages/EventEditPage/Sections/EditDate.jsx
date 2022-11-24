import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../../../components/DateInput';
import SectionTitle from '../../../components/SectionTitle';
import { setEventEndDate, setEventNoLimitDate, setEventStartDate } from '../../../store/actions/event_actions';

const EditDate = (props) => {
  const startDate = useSelector(state => state.event.startDate);
  const endDate = useSelector(state => state.event.endDate);
  const noLimitDate = useSelector(state => state.event.noLimitDate);
  const { sx, formStatus } = props;
  const dispatch = useDispatch();

  const onChangeStartDate = useCallback((newValue) => {
    dispatch(setEventStartDate(newValue));
  }, []);

  const onChangeEndDate = useCallback((newValue) => {
    dispatch(setEventEndDate(newValue));
  }, []);

  const onChangeNoLimitDate = useCallback((e) => {
    dispatch(setEventNoLimitDate(e.target.checked));
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 기간" />
      <Box display="flex" alignItems="center" sx={{ pt: 2 }}>
        <DateInput
          label="오픈 시간"
          containTime
          minDate={new Date()}
          maxDate={endDate}
          disabled={noLimitDate}
          value={startDate}
          onChangeValue={onChangeStartDate}
          sx={{ maxWidth: 370 }}
        />
        <Box sx={{ mx: 2 }}>
          ~
        </Box>
        <DateInput
          label="마감 시간"
          containTime
          minDate={startDate}
          disabled={noLimitDate}
          value={endDate}
          onChangeValue={onChangeEndDate}
          sx={{ maxWidth: 370 }}
        />
        <FormControlLabel
          label="제한 없음"
          control={
            <Checkbox
              checked={noLimitDate}
              onChange={onChangeNoLimitDate}
              sx={{ ml: 2 }}
            />
          }
        />
      </Box>
      {formStatus && (
        <FormHelperText error sx={{mt: 1, ml: 2}}>
          {formStatus}
        </FormHelperText>
      )}
    </Box>
  );
};

export default EditDate;