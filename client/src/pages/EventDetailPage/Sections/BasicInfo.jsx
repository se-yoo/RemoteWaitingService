import { Box } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { formatKorTime } from '../../../utils/function';

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
}

const BasicInfo = () => {
  const { 
    title, 
    description,
    createDate, 
    startDate,
    endDate
  } = tempEvent;

  return (
    <>
      <Box
        component="div"
        fontSize={36}
        mt={2.5}
      >
        {title}
      </Box>
      <Box
        component="div"
        fontSize={16}
        my={3}
        color={"#BCBCBC"}
      >
        생성일: {createDate}
      </Box>
      <SectionTitle title="이벤트 설명" sx={{ mt: 6 }} />
      <Box>{description}</Box>
      <SectionTitle title="이벤트 기간" sx={{ mt: 6 }} />
      <Box>
        {formatKorTime(startDate)} ~ {formatKorTime(endDate)}
      </Box>
    </>
  );
};

export default BasicInfo;