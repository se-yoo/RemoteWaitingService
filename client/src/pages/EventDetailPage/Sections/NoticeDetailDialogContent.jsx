import { Box } from "@mui/material";
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { StyledDialogContent } from "../../../components/CommonDialog";
import SectionTitle from "../../../components/SectionTitle";
import { NOTICE_TARGET_TEXT } from "../../../utils/code";

const NoticeDetailDialogContent = memo((props) => {
  const title = useSelector((state) => state.notice.title);
  const description = useSelector((state) => state.notice.description);
  const target = useSelector((state) => state.notice.target);
  const { isAdmin } = props;

  const targetText = useMemo(() => {
    const targetInfo = NOTICE_TARGET_TEXT.find(
      (noticeTarget) => noticeTarget.value === target,
    );
    return targetInfo ? targetInfo.text : "알 수 없음";
  }, [target]);

  return (
    <StyledDialogContent sx={{ mt: 3 }}>
      <Box fontSize="36px">{title}</Box>
      <SectionTitle title="공지 내용" sx={{ mt: 6 }} />
      <Box lineHeight="32px" maxHeight="10rem" sx={{ overflowY: "auto" }}>
        {description}
      </Box>
      {isAdmin && (
        <>
          <SectionTitle title="공지 대상" sx={{ mt: 6 }} />
          {targetText}
        </>
      )}
    </StyledDialogContent>
  );
});

export default NoticeDetailDialogContent;
