import { Box, FormControl, MenuItem, Select } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import { setEventOptionCd } from '../../../store/actions/event_actions';
import { EVENT_OPTION_TEXT } from '../../../utils/code';

const EditOption = (props) => {
  const optionCd = useSelector(state => state.event.optionCd);
  const participantCnt = useSelector(state => state.event.participantCnt);
  const { sx } = props;
  const dispatch = useDispatch();

  const onChangeOptionCd = useCallback((e) => {
    dispatch(setEventOptionCd(e.target.value));
  }, []);

  const readOnly = useMemo(() => {
    return participantCnt > 0;
  }, [participantCnt]);

  const optionText = useMemo(() => {
    return EVENT_OPTION_TEXT.find(option => option.value === optionCd).text;
  }, [optionCd]);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 옵션" />
      {readOnly ? (
          <>
            <Box color="#CA3737" mb={2}>
              * 이벤트 옵션은 참여자가 없을 경우에만 편집이 가능합니다
            </Box>
            <Box>{optionText}</Box>
          </>
        )
        :(
          <FormControl fullWidth>
            <Select
              value={optionCd}
              onChange={onChangeOptionCd}
              sx={{ maxWidth: 370 }}
            >
              {EVENT_OPTION_TEXT.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
    </Box>
  );
};

export default EditOption;