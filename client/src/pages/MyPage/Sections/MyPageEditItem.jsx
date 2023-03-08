import React, { useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';

const MyPageEditItem = (props) => {
  const { sectionName, sx, sectionContent,onChangeValue, fieldType, errorCheck, helpertext } = props;


  const onChangeHandler = useCallback((e) => {
    onChangeValue(e.target.value);
  }, [onChangeValue]);

  return (
    <Box sx={sx}>
      <SectionTitle title={sectionName} />
      <Box display="flex" alignItems="center" fontSize={16} my={1.5} >
        <TextField value={sectionContent} type={fieldType} onChange={onChangeHandler} error={errorCheck} helperText={errorCheck?helpertext:""} />
      </Box>
     </Box>
  );
}

MyPageEditItem.defaultProps = {
  sectionTitle: "제목",
  sectionContent: "내용",
  fieldType:"text",
  sx: {mt:"49px"},
  errorCheck:false,
  helpertext:""
}

export default MyPageEditItem;