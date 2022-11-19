import { Box, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyledDialogContent } from '../../../components/CommonDialog';
import ParticipantInfoTable from './ParticipantInfoTable';

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "응답 시간", align: "left", value: 'participantDate' }
];

const SettingWinDialogContent = memo(() => {
  const [directly, setDirectly] = useState(false);
  const [winnerCount, setWinnerCount] = useState(null);
  const [selected, setSelected] = useState([]);
  
  const selectedCount = useMemo(() => {
    return selected.length;
  }, [selected.length]);

  const onChangeDirectly = useCallback((e) => {
    setDirectly(e.target.checked);
  }, []);

  const onChangeWinnerCount = useCallback((e) => {
    setWinnerCount(e.target.value);
  }, []);

  const onChangeSelected = useCallback((newSelected) => {
    setSelected(newSelected);
  }, []);

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
      <ParticipantInfoTable
        headers={headers}
        checkboxSelection
        checkboxReadonly={!directly}
        rowsPerPage={4}
        selected={selected}
        onChangeSelected={onChangeSelected}
        sx={{
          maxHeight: 325,
          overflowY: "auto"
        }}
      />
      <Box
        display="flex"
        justifyContent="end"
        sx={{color: "primary"}}
      >
        {selectedCount}명 선택됨
      </Box>
    </StyledDialogContent>
  );
});

export default SettingWinDialogContent;