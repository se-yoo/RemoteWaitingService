import React, { useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';

const MyPageEditItem = (props) => {
  const { SectionName, sx, SectionContent,onChangeValue } = props;


  const onChangeHandler = useCallback((e) => {
    onChangeValue(e.target.value);
  }, [onChangeValue]);

  return (
    <Box sx={sx}>
      <SectionTitle title={SectionName} />
      <Box display="flex" alignItems="center" fontSize={16} my={1.5} >
        <TextField value={SectionContent} onChange={onChangeHandler} />
      </Box>
     </Box>
  );
}

MyPageEditItem.defaultProps = {
  SectionTitle: "제목",
  SectionContent: "내용",
  sx: {mt:"49px"}
}

export default MyPageEditItem;