import { Box, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import SectionTitle from '../../../components/SectionTitle';

const EditDesc = (props) => {
  const { value, onChangeValue, sx } = props;

  const onChangeDesc = useCallback((e) => {
    onChangeValue(e.target.value);
  }, [onChangeValue]);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 설명" />
      <TextField
        value={value}
        onChange={onChangeDesc}
        multiline
        rows={5}
        placeholder={"이벤트 설명을 작성해주세요."}
      />
    </Box>
  );
};

export default EditDesc;