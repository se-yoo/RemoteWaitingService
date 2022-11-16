import { Box, Button } from '@mui/material';
import React, { memo } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { EVENT_OPTION } from '../../../utils/code';
import ParticipantInfoTable from './ParticipantInfoTable';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempEvent = { 
  id: 1, 
  title: '이벤트 제목', 
  description: '이벤트 설명',
  participantCnt: 10, 
  createDate: '2022-09-27', 
  startDate: '2022-09-27 15:00:00',
  endDate: '2022-10-05 18:00:00',
  option: 0
};

const ParticipantInfo = memo(() => {
  const { participantCnt, option } = tempEvent;

  return (
    <>
      <SectionTitle title="참여 정보" sx={{ mt: 6 }} />
      <Box>{participantCnt}명 참여</Box>
      <ParticipantInfoTable />
      <Box
        display="flex"
        justifyContent="end"
        mt={4}
      >
        <Button type="translucent" customsize="small">
          전체 답변 상세
        </Button>
        {option !== EVENT_OPTION.WAITING && (
            <Button
              type="translucent"
              customsize="small"
              sx={{ ml: 2 }}
            >
              당첨 설정
            </Button>
        )}
      </Box>
    </>
  );
});

export default ParticipantInfo;