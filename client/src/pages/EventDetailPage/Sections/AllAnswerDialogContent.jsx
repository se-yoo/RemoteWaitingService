import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyledDialogContent } from '../../../components/CommonDialog';
import DataTable from '../../../components/DataTable';
import { getSeq } from '../../../utils/function';
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

const AllAnswerDialogContent = memo(() => {
  const [page, setPage] = useState(1);
  const [headers, setHeaders] = useState([]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    const tempHeaders = [
      { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" } },
      { text: "응답 시간", align: "center", width: "15%", sx: { minWidth: "120px" } }
    ];

    tempEventQuestionList.forEach(question => {
      tempHeaders.splice(1, 0, {
        text: question.question,
        align: "left"
      });
    });

    setHeaders(tempHeaders);
  }, []);

  const ItemRowComponent = useCallback(({item, index}) => {
    return (
      <AllAnswerDialogContentRow
        item={item} 
        index={getSeq(page, 8, index)}
        questions={tempEventQuestionList}
      />
    );
  });

  return (
    <StyledDialogContent>
      <DataTable
        headers={headers}
        items={tempEventParticipantList}
        page={page}
        sx={{ my: 3 }}
        rowsPerPage={8}
        onChangePage={handleChangePage}
        ItemRowComponent={ItemRowComponent}
      />
    </StyledDialogContent>
  );
});

export default AllAnswerDialogContent;