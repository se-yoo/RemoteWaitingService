import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useCallback, useMemo } from 'react';
import { StyledDialogContent } from '../../../components/CommonDialog';
import { getPageCount, getPageItems, getSeq } from '../../../utils/function';
import AllAnswerDialogContentRow from './AllAnswerDialogContentRow';

// 화면 작업을 위한 임시 값, 추후 삭제
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

const rowsPerPage = 10;

const AllAnswerDialogContent = memo(() => {
  const [page, setPage] = React.useState(1);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const pageCount = useMemo(() => {
    return getPageCount(tempEventParticipantList.length, rowsPerPage);
  }, []);

  const pageItems = useMemo(() => {
    return getPageItems(page, tempEventParticipantList, rowsPerPage);
  }, [page]);

  return (
    <StyledDialogContent>
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
              {tempEventQuestionList.map(question => (
                <TableCell 
                  key={question.id}
                  align="left"
                >
                  {question.question}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ minWidth: "120px" }}
                width="15%"
              >
                응답 시간
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item, index) => (
              <AllAnswerDialogContentRow
                key={item.id} 
                item={item} 
                index={getSeq(page, rowsPerPage, index)}
                questions={tempEventQuestionList}
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
    </StyledDialogContent>
  );
});

export default AllAnswerDialogContent;