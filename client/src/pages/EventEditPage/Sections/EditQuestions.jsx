import { Box } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';

const EditQuestions = (props) => {
  const { value, onChangeValue, sx } = props;

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 문항" />
    </Box>
  );
};

export default EditQuestions;