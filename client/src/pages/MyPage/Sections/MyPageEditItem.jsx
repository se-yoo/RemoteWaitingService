import React, { useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';

const MyPageEditItem = (props) => {
  const { sectionName, sx, sectionContent,onChangeValue } = props;


  const onChangeHandler = useCallback((e) => {
    onChangeValue(e.target.value);
  }, [onChangeValue]);

  return (
    <Box sx={sx}>
      <SectionTitle title={sectionName} />
      <Box display="flex" alignItems="center" fontSize={16} my={1.5} >
        <TextField value={sectionContent} onChange={onChangeHandler} />
      </Box>
     </Box>
  );
}

MyPageEditItem.defaultProps = {
  sectionTitle: "제목",
  sectionContent: "내용",
  sx: {mt:"49px"}
}

export default MyPageEditItem;