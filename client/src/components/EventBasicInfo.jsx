import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "./SectionTitle";
import { formatDate, formatKorTime } from "../utils/function";

const EventBasicInfo = (props) => {
  const event = useSelector((state) => state.event);
  const { title, description, createDate, noLimitDate, startDate, endDate } =
    event;
  const { hideCreateDate } = props;

  return (
    <>
      <Box component="div" fontSize={36} mt={2.5}>
        {title}
      </Box>
      {!hideCreateDate && (
        <Box component="div" fontSize={16} my={3} color="#BCBCBC">
          생성일: {formatDate(createDate)}
        </Box>
      )}
      <SectionTitle title="이벤트 설명" sx={{ mt: 6 }} />
      <Box>{description}</Box>
      <SectionTitle title="이벤트 기간" sx={{ mt: 6 }} />
      <Box>
        {noLimitDate
          ? "제한 없음"
          : `${formatKorTime(startDate)} ~ ${formatKorTime(endDate)}`}
      </Box>
    </>
  );
};

EventBasicInfo.defaultProps = {
  hideCreateDate: false,
};

export default EventBasicInfo;
