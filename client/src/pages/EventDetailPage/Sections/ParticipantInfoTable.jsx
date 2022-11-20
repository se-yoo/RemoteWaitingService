import { Button, TableCell } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { EVENT_OPTION, PARTICIPANT_STATUS_INFO, WAITING_PARTICIPANT_STATUS_INFO } from '../../../utils/code';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DataTable from '../../../components/DataTable';
import ParticipantInfoTableExpand from './ParticipantInfoTableExpand';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempEvent = { 
  id: 1, 
  title: '이벤트 제목', 
  description: '이벤트 설명',
  participantCnt: 10, 
  createDate: '2022-09-27', 
  startDate: '2022-09-27 15:00:00',
  endDate: '2022-10-05 18:00:00',
  option: 1
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

const ParticipantInfoTable = memo((props) => {
  const [page, setPage] = useState(1);
  const [statusInfos, setStatusInfos] = useState([]);
  const { option } = tempEvent;
  const { 
    headers, 
    sx, 
    checkboxSelection, 
    checkboxReadonly,
    selected, 
    onChangeSelected, 
    rowsPerPage 
  } = props;

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    switch(option) {
      case EVENT_OPTION.WAITING:
        setStatusInfos(WAITING_PARTICIPANT_STATUS_INFO);
        break;
      case EVENT_OPTION.FCFS:
      case EVENT_OPTION.RANDOM:
        setStatusInfos(PARTICIPANT_STATUS_INFO);
        break;
      default:
        setStatusInfos(PARTICIPANT_STATUS_INFO);
        break;
    }
  }, []);

  const statusText = useCallback((status) => {
    const statusInfo = statusInfos.find(item => item.value === status);
    return statusInfo? statusInfo.text : '-';
  }, [statusInfos]);

  const statusColor = useCallback((status) => {
    const statusInfo = statusInfos.find(item => item.value === status);
    return statusInfo? statusInfo.color : 'black';
  }, [statusInfos]);

  const ItemCellComponent = {
    status: ({item}) => (
      <TableCell 
        align="center" 
        sx={{ color: `${statusColor(item.status)} !important` }}
      >
        {statusText(item.status)}
      </TableCell>
    )
  };

  const CollapseContentComponent = useCallback(({item}) => {
    return (
      <ParticipantInfoTableExpand
        item={item}
        questions={tempEventQuestionList}
        option={option}
      />
    )
  }, [option]);

  const HideButton = useCallback(({onClick}) => {
    return (
      <Button type="innerTable" customsize="x-small" onClick={onClick}>
        닫기 <ExpandLessIcon />
      </Button>
    )
  }, []);

  const ShowButton = useCallback(({onClick}) => {
    return (
      <Button type="innerTable" customsize="x-small" onClick={onClick}>
        조회 <ExpandMoreOutlinedIcon />
      </Button>
    )
  }, []);

  return (
    <DataTable
      headers={headers}
      items={tempEventParticipantList}
      page={page}
      rowsPerPage={rowsPerPage || 5}
      sx={{ my: 3, ...sx }}
      showExpand
      expandHeaderText="답변 상세"
      HideControlComponent={HideButton}
      ExpandControlComponent={ShowButton}
      CollapseContentComponent={CollapseContentComponent}
      onChangePage={handleChangePage}
      ItemCellComponent={ItemCellComponent}
      checkboxSelection={checkboxSelection}
      checkboxReadonly={checkboxReadonly}
      selected={selected}
      onChangeSelected={onChangeSelected}
    />
  );
});

export default ParticipantInfoTable;