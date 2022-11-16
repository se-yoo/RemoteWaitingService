import { Box, Button } from '@mui/material';
import React, { memo } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import NoticeInfoTable from './NoticeInfoTable';

const NoticeInfo = memo(() => {
  return (
    <>
      <SectionTitle title="이벤트 공지" sx={{ mt: 6 }} />
      <NoticeInfoTable />
      <Box
        display="flex"
        justifyContent="end"
        mt={4}
      >
        <Button type="translucent" customsize="small">
          공지하기
        </Button>
      </Box>
    </>
  );
});

export default NoticeInfo;