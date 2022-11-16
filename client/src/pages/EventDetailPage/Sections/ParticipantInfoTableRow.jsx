import { Button, Collapse, TableCell, TableRow } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { EVENT_OPTION, PARTICIPANT_STATUS_INFO, WAITING_PARTICIPANT_STATUS_INFO } from '../../../utils/code';
import SectionTitle from '../../../components/SectionTitle';
import AnswerList from './AnswerList';
import { Box } from '@mui/system';

const ParticipantInfoTableRow = memo((props) => {
  const { item, index, eventOption, questions } = props;
  const [ open, setOpen ] = useState(false);
  const [ statusInfos, setStatusInfos ] = useState([]);

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    switch(eventOption) {
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

  return (
    <>
      <TableRow>
        <TableCell align="center">{index}</TableCell>
        <TableCell align="left">{item.participantDate}</TableCell>
        <TableCell 
          align="center" 
          sx={{ color: `${statusColor(item.status)} !important` }}
        >
          {statusText(item.status)}
        </TableCell>
        <TableCell align="center">
          {open ? 
            <Button type="innerTable" customsize="x-small" onClick={toggleOpen}>
              닫기 <ExpandLessIcon />
            </Button>
            : <Button type="innerTable" customsize="x-small" onClick={toggleOpen}>
              조회 <ExpandMoreOutlinedIcon />
            </Button>
          }
        </TableCell>
      </TableRow>
      <TableRow type="collapse">
        <TableCell colSpan={4}>
          <Collapse in={open} timeout="auto">
            응답 시간 - {item.participantDate}
            <SectionTitle title="답변 내용" sx={{ mt: 3 }} />
            <AnswerList 
              questions={questions} 
              answers={item.answers} 
            />
            {eventOption === EVENT_OPTION.WAITING && (
              <Box display="flex" justifyContent="end">
                <Button type="translucent" color="red" customsize="x-small">
                  입장 거절
                </Button>
                <Button type="translucent" sx={{ ml: 2 }} customsize="x-small">
                  입장 완료
                </Button>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

export default ParticipantInfoTableRow;