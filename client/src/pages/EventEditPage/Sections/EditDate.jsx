import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateInput from "../../../components/DateInput";
import SectionTitle from "../../../components/SectionTitle";
import {
  setEventEndDate,
  setEventNoLimitDate,
  setEventStartDate,
} from "../../../store/actions/event_actions";

const EditDate = (props) => {
  const startDate = useSelector((state) => state.event.startDate);
  const endDate = useSelector((state) => state.event.endDate);
  const noLimitDate = useSelector((state) => state.event.noLimitDate);
  const { sx, formStatus } = props;
  const dispatch = useDispatch();

  const onChangeStartDate = useCallback((newValue) => {
    dispatch(setEventStartDate(newValue));
  }, []);

  const onChangeEndDate = useCallback((newValue) => {
    dispatch(setEventEndDate(newValue));
  }, []);

  const onChangeNoLimitDate = useCallback((e) => {
    dispatch(setEventNoLimitDate(e.target.checked));
  }, []);

  return (
    <Box sx={sx}>
      <SectionTitle title="이벤트 기간" />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 2 }}
      >
        <Grid item xs={5.5} md="auto">
          <DateInput
            label="오픈 시간"
            containTime
            maxDate={endDate}
            disabled={noLimitDate}
            value={startDate}
            onChangeValue={onChangeStartDate}
            sx={{ maxWidth: 370 }}
          />
        </Grid>
        <Grid item xs md={1} lg={0.5} sx={{ textAlign: "center" }}>
          ~
        </Grid>
        <Grid item xs={5.5} md="auto">
          <DateInput
            label="마감 시간"
            containTime
            minDate={startDate}
            disabled={noLimitDate}
            value={endDate}
            onChangeValue={onChangeEndDate}
            sx={{ maxWidth: 370 }}
          />
        </Grid>
        <Grid item xs={12} md sx={{ mt: { xs: 2, md: 0 } }}>
          <FormControlLabel
            label="제한 없음"
            control={
              <Checkbox
                checked={noLimitDate}
                onChange={onChangeNoLimitDate}
                sx={{ ml: 2 }}
              />
            }
          />
        </Grid>
      </Grid>
      {formStatus && (
        <FormHelperText error sx={{ mt: 1, ml: 2 }}>
          {formStatus}
        </FormHelperText>
      )}
    </Box>
  );
};

export default EditDate;
