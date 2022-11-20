import { Box } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StyledDialogContent } from '../../../components/CommonDialog';
import SectionTitle from '../../../components/SectionTitle';

const UserNoticeDetailDialogContent = memo(() => {
  const title = useSelector(state => state.notice.title);
  const description = useSelector(state => state.notice.description);

  return (
    <StyledDialogContent sx={{ mt: 3 }}>
      <Box fontSize="36px">
        {title}
      </Box>
      <SectionTitle title="공지 내용" sx={{ mt: 6 }} />
      <Box
        lineHeight="32px"
        maxHeight="10rem"
        sx={{overflowY: "auto"}}
      >
        {description}
      </Box>
    </StyledDialogContent>
  );
});

export default UserNoticeDetailDialogContent;