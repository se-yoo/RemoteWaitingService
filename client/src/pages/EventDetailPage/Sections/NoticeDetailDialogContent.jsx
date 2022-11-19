import { Box } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StyledDialogContent } from '../../../components/CommonDialog';
import SectionTitle from '../../../components/SectionTitle';
import { NOTICE_TARGET_TEXT } from '../../../utils/code';

const NoticeDetailDialogContent = memo(() => {
  const notice = useSelector(state => state.notice);

  const targetText = useMemo(() => {
    const targetInfo = NOTICE_TARGET_TEXT.find(target => target.value === notice.target);
    return targetInfo ? targetInfo.text : '알 수 없음';
  }, [notice.target]);

  return (
    <StyledDialogContent sx={{ mt: 3 }}>
      <Box fontSize="36px">
        {notice.title}
      </Box>
      <SectionTitle title="공지 내용" sx={{ mt: 6 }} />
      <Box
        lineHeight="32px"
        maxHeight="10rem"
        sx={{overflowY: "auto"}}
      >
        {notice.description}
      </Box>
      <SectionTitle title="공지 대상" sx={{ mt: 6 }} />
      {targetText}
    </StyledDialogContent>
  );
});

export default NoticeDetailDialogContent;