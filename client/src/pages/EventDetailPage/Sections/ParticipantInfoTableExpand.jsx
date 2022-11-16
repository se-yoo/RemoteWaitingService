import { Box, Button } from '@mui/material';
import React, { memo } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { EVENT_OPTION } from '../../../utils/code';
import AnswerList from './AnswerList';

const ParticipantInfoTableExpand = memo((props) => {
  const {item, questions, option} = props;

  return (
    <>
      응답 시간 - {item.participantDate}
      <SectionTitle title="답변 내용" sx={{ mt: 3 }} />
      <AnswerList 
        questions={questions} 
        answers={item.answers} 
      />
      {option === EVENT_OPTION.WAITING && (
        <Box display="flex" justifyContent="end">
          <Button type="translucent" color="red" customsize="x-small">
            입장 거절
          </Button>
          <Button type="translucent" sx={{ ml: 2 }} customsize="x-small">
            입장 완료
          </Button>
        </Box>
      )}
    </>
  );
});

export default ParticipantInfoTableExpand;