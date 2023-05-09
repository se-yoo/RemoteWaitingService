import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StyledDialogContent } from "../../../components/CommonDialog";
import { EVENT_OPTION } from "../../../utils/code";
import ParticipationInfoTable from "./ParticipationInfoTable";

const headers = [
  {
    text: "순서",
    align: "center",
    width: "7%",
    sx: { minWidth: "4rem" },
    value: "index",
    useIndex: true,
  },
  { text: "응답 시간", align: "left", value: "participateDate" },
];

function getRandomIndex(max) {
  const candidate = Array(max)
    .fill()
    .map((v, i) => i);
  const shuffleIndex = [];

  while (candidate.length > 0) {
    shuffleIndex.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0],
    );
  }

  return shuffleIndex;
}

const SettingWinDialogContent = memo((props) => {
  const [directly, setDirectly] = useState(false);
  const [winnerCount, setWinnerCount] = useState(0);
  const { selected, onChange } = props;
  const optionCd = useSelector((state) => state.event.optionCd);
  const answers = useSelector((state) => state.answer.eventAnswers);

  const selectedCount = useMemo(() => {
    return selected.length;
  }, [selected.length]);

  const onChangeDirectly = useCallback((e) => {
    setDirectly(e.target.checked);
  }, []);

  const onChangeWinnerCount = useCallback(
    (e) => {
      const newWinnerCount = e.target.value;
      setWinnerCount(newWinnerCount);

      if (optionCd === EVENT_OPTION.FCFS) {
        onChange([...answers.slice(0, newWinnerCount)]);
      } else {
        let result = [];
        const randomIndexs = getRandomIndex(answers.length);

        for (let count = 0; count < newWinnerCount; count++) {
          if (count >= answers.length) break;
          result.push(answers[randomIndexs[count]]);
        }
        onChange(result);
      }
    },
    [onChange, optionCd, answers],
  );

  const onChangeSelected = useCallback(
    (newSelected) => {
      onChange(newSelected);
    },
    [onChange],
  );

  return (
    <StyledDialogContent sx={{ mt: 6 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
          <FormControlLabel
            control={
              <Checkbox checked={directly} onChange={onChangeDirectly} />
            }
            label="직접 선정"
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="인원 수"
            disabled={directly}
            type="number"
            value={winnerCount}
            onChange={onChangeWinnerCount}
            fullWidth
          />
        </Grid>
      </Grid>
      <ParticipationInfoTable
        headers={headers}
        checkboxSelection
        checkboxReadonly={!directly}
        rowsPerPage={4}
        selected={selected}
        onChangeSelected={onChangeSelected}
        sx={{
          maxHeight: 325,
          overflowY: "auto",
        }}
      />
      <Box display="flex" justifyContent="end" sx={{ color: "#496F46" }}>
        {selectedCount}명 선택됨
      </Box>
    </StyledDialogContent>
  );
});

export default SettingWinDialogContent;
