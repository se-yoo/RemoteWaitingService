import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';
import { EVENT_OPTION } from '../../../utils/code';
import { getPageCount, getPageItems, getSeq } from '../../../utils/function';
import ParticipantInfoTableRow from './ParticipantInfoTableRow';

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

const tempEventParticipantList = [
  { id: 1, participantDate: '2022-09-26 15:00:01.002', status: 0, answers: ['홍길동', 1] },
  { id: 2, participantDate: '2022-09-26 15:00:01.003', status: 2, answers: ['홍길동', 1] },
  { id: 3, participantDate: '2022-09-26 15:00:01.004', status: 3, answers: ['홍길동', 1] },
  { id: 4, participantDate: '2022-09-26 15:00:01.005', status: 0, answers: ['홍길동', 1] },
  { id: 5, participantDate: '2022-09-26 15:00:01.006', status: 0, answers: ['홍길동', 1] },
  { id: 6, participantDate: '2022-09-26 15:00:01.007', status: 0, answers: ['홍길동', 1] },
  { id: 7, participantDate: '2022-09-26 15:00:01.008', status: 0, answers: ['홍길동', 1] },
  { id: 8, participantDate: '2022-09-26 15:00:01.009', status: 0, answers: ['홍길동', 1] },
  { id: 9, participantDate: '2022-09-26 15:00:01.010', status: 0, answers: ['홍길동', 1] },
  { id: 10, participantDate: '2022-09-26 15:00:01.011', status: 0, answers: ['홍길동', 1] },
  { id: 11, participantDate: '2022-09-26 15:00:01.012', status: 0, answers: ['홍길동', 1] },
  { id: 12, participantDate: '2022-09-26 15:00:01.013', status: 0, answers: ['홍길동', 1] }
];

const tempEventQuestionList = [
  { id: 'question-1', question: '이름', required: true, answerType: 0 },
  { id: 'question-2', question: '성별', required: true, answerType: 4, options: [{ text: '남성', value: 1 }, { text: '여성', value: 2 }] }
];
// 화면 작업을 위한 임시 값 끝

const rowsPerPage = 5;

const ParticipantInfoTable = memo(() => {
  const [page, setPage] = React.useState(1);
  const { option } = tempEvent;

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const pageCount = useMemo(() => {
    return getPageCount(tempEventParticipantList.length, rowsPerPage);
  }, [rowsPerPage]);

  const pageItems = useMemo(() => {
    return getPageItems(page, tempEventParticipantList, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <>
      <TableContainer component={Box} sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center" 
                sx={{ minWidth: "4rem" }}
                width="7%"
              >
                순서
              </TableCell>
              <TableCell align="left">응답 시간</TableCell>
              <TableCell align="center">
                {option === EVENT_OPTION.WAITING ? '입장' : '당첨'} 여부
              </TableCell>
              <TableCell
                align="center" 
                sx={{ minWidth: "120px" }}
                width="15%"
              >
                답변 상세
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item, index) => (
              <ParticipantInfoTableRow 
                key={item.id} 
                item={item} 
                index={getSeq(page, rowsPerPage, index)}
                questions={tempEventQuestionList}
                eventOption={option} 
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination 
        count={pageCount} 
        page={page} 
        onChange={handleChangePage}
        sx={{ mt: 5 }}
      />
    </>
  );
});

export default ParticipantInfoTable;