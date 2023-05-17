import { Box, Button } from "@mui/material";
import React, { memo, useCallback } from "react";
import AnswerList from "../../../components/AnswerList";
import SectionTitle from "../../../components/SectionTitle";
import { EVENT_OPTION, PARTICIPATION_STATUS } from "../../../utils/code";
import { formatDatetime } from "../../../utils/function";

const ParticipationInfoTableExpand = memo((props) => {
  const { item, questions, option, onClickEnterStatus } = props;

  const onClickStatus = useCallback(
    (status) => {
      const body = {
        ...item,
        status: status,
      };

      onClickEnterStatus(body, item.status);
    },
    [item],
  );

  return (
    <>
      응답 시간 - {formatDatetime(item.participateDate)}
      <SectionTitle title="답변 내용" sx={{ mt: 3 }} />
      <AnswerList questions={questions} answers={item.answers} />
      {option === EVENT_OPTION.WAITING && (
        <Box display="flex" justifyContent="end">
          <Button
            type="translucent"
            color="red"
            customsize="x-small"
            onClick={() => onClickStatus(PARTICIPATION_STATUS.ENTER_CANCEL)}
          >
            입장 취소
          </Button>
          <Button
            type="translucent"
            sx={{ ml: 2 }}
            customsize="x-small"
            onClick={() => onClickStatus(PARTICIPATION_STATUS.ENTER)}
          >
            입장 완료
          </Button>
        </Box>
      )}
    </>
  );
});

export default ParticipationInfoTableExpand;
