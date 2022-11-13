import React from 'react';
import { Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';

const MyPageInfoItem = (props) => {
  const { sectionName, sx, sectionContent } = props;

  return (
    <Box sx={sx}>
      <SectionTitle title={sectionName} />
      <Box display="flex" alignItems="center" fontSize={16} my={1.5} >
        {sectionContent}
      </Box>
     </Box>
  );
}

MyPageInfoItem.defaultProps = {
  SectionTitle: "제목",
  SectionContent: "내용",
  sx: {mt:"49px"}
}

export default MyPageInfoItem;