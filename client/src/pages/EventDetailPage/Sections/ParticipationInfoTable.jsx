import { Button, TableCell } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  EVENT_OPTION,
  PARTICIPATION_STATUS_INFO,
  WAITING_PARTICIPATION_STATUS_INFO,
} from "../../../utils/code";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import DataTable from "../../../components/DataTable";
import ParticipationInfoTableExpand from "./ParticipationInfoTableExpand";
import { useDispatch, useSelector } from "react-redux";
import { loadEventAnswerList } from "../../../store/actions/answer_actions";
import { useParams } from "react-router-dom";
import { formatDatetime } from "../../../utils/function";

const ParticipationInfoTable = memo((props) => {
  const [page, setPage] = useState(1);
  const [statusInfos, setStatusInfos] = useState([]);
  const event = useSelector((state) => state.event);
  const answers = useSelector((state) => state.answer.eventAnswers);
  const { optionCd, questions } = event;
  const {
    headers,
    sx,
    checkboxSelection,
    checkboxReadonly,
    selected,
    onChangeSelected,
    onClickEnterStatus,
    rowsPerPage,
  } = props;
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    if (eventId !== event._id) return;

    switch (optionCd) {
      case EVENT_OPTION.WAITING:
        setStatusInfos(WAITING_PARTICIPATION_STATUS_INFO);
        break;
      case EVENT_OPTION.FCFS:
      case EVENT_OPTION.RANDOM:
        setStatusInfos(PARTICIPATION_STATUS_INFO);
        break;
      default:
        setStatusInfos(PARTICIPATION_STATUS_INFO);
        break;
    }

    const variable = {
      eventId: eventId,
      optionCd: optionCd,
    };

    dispatch(loadEventAnswerList(variable));
  }, [event]);

  const statusText = useCallback(
    (status) => {
      const statusInfo = statusInfos.find((item) => item.value === status);
      return statusInfo ? statusInfo.text : "-";
    },
    [statusInfos],
  );

  const statusColor = useCallback(
    (status) => {
      const statusInfo = statusInfos.find((item) => item.value === status);
      return statusInfo ? statusInfo.color : "black";
    },
    [statusInfos],
  );

  const ItemCellComponent = {
    participateDate: ({ item }) => (
      <TableCell align="left">{formatDatetime(item.participateDate)}</TableCell>
    ),
    status: ({ item }) => (
      <TableCell
        align="center"
        sx={{ color: `${statusColor(item.status)} !important` }}
      >
        {statusText(item.status)}
      </TableCell>
    ),
  };

  const CollapseContentComponent = useCallback(
    ({ item }) => {
      return (
        <ParticipationInfoTableExpand
          item={item}
          questions={questions}
          option={optionCd}
          onClickEnterStatus={onClickEnterStatus}
        />
      );
    },
    [optionCd, questions],
  );

  const HideButton = useCallback(({ onClick }) => {
    return (
      <Button type="innerTable" customsize="x-small" onClick={onClick}>
        닫기 <ExpandLessIcon />
      </Button>
    );
  }, []);

  const ShowButton = useCallback(({ onClick }) => {
    return (
      <Button type="innerTable" customsize="x-small" onClick={onClick}>
        조회 <ExpandMoreOutlinedIcon />
      </Button>
    );
  }, []);

  return (
    <DataTable
      headers={headers}
      items={answers}
      page={page}
      rowsPerPage={rowsPerPage || 5}
      sx={{ my: 3, ...sx }}
      tableSx={{ minWidth: 600 }}
      showExpand
      expandHeaderText="답변 상세"
      HideControlComponent={HideButton}
      ExpandControlComponent={ShowButton}
      CollapseContentComponent={CollapseContentComponent}
      onChangePage={onChangePage}
      ItemCellComponent={ItemCellComponent}
      checkboxSelection={checkboxSelection}
      checkboxReadonly={checkboxReadonly}
      selected={selected}
      onChangeSelected={onChangeSelected}
    />
  );
});

export default ParticipationInfoTable;
