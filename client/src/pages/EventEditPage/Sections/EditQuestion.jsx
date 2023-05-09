import { Box, Button, FormHelperText } from "@mui/material";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventQuestion } from "../../../store/actions/event_actions";
import SectionTitle from "../../../components/SectionTitle";
import EditQuestionList from "./EditQuestionList";
import QuestionList from "../../../components/QuestionList";

const EditQuestion = memo((props) => {
  const { sx, formStatus } = props;
  const event = useSelector((state) => state.event);
  const { participationCnt, questions } = event;
  const dispatch = useDispatch();

  const readOnly = useMemo(() => {
    return participationCnt > 0;
  }, [participationCnt]);

  const onClickQuestionAdd = useCallback(() => {
    dispatch(addEventQuestion());
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 문항" />
      {readOnly ? (
        <>
          <Box color="#CA3737" mb={2}>
            * 이벤트 문항은 참여자가 없을 경우에만 편집이 가능합니다
          </Box>
          <QuestionList questions={questions} />
        </>
      ) : (
        <>
          <EditQuestionList />
          <Button
            type="translucent"
            sx={{
              fontSize: 24,
              fontWeight: 400,
            }}
            fullWidth
            onClick={onClickQuestionAdd}
          >
            + 항목 추가
          </Button>
          {formStatus && (
            <FormHelperText error sx={{ mt: 1, ml: 2 }}>
              {formStatus}
            </FormHelperText>
          )}
        </>
      )}
    </Box>
  );
});

export default EditQuestion;
