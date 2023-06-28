import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyledDialogContent } from "../../../components/CommonDialog";
import DataTable from "../../../components/DataTable";
import { getSeq } from "../../../utils/function";
import AllAnswerDialogContentRow from "./AllAnswerDialogContentRow";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../../styles/theme";

const AllAnswerDialogContent = memo(() => {
  const [page, setPage] = useState(1);
  const [headers, setHeaders] = useState([]);
  const questions = useSelector((state) => state.event.questions);
  const answers = useSelector((state) => state.answer.eventAnswers);

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    const tempHeaders = [
      { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" } },
      {
        text: "응답 시간",
        align: "center",
        width: "15%",
        sx: { minWidth: "120px" },
      },
    ];

    questions.forEach((question) => {
      tempHeaders.splice(tempHeaders.length - 1, 0, {
        text: question.question,
        align: "left",
      });
    });

    setHeaders(tempHeaders);
  }, []);

  const ItemRowComponent = useCallback(({ item, index }) => {
    return (
      <AllAnswerDialogContentRow
        item={item}
        index={getSeq(page, 8, index)}
        questions={questions}
      />
    );
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDialogContent>
      <DataTable
        headers={headers}
        items={answers}
        page={page}
        sx={{ my: { xs: 1, md: 3 } }}
        tableSx={{ minWidth: 120 * headers.length }}
        rowsPerPage={isMobile ? 6 : 8}
        onChangePage={onChangePage}
        ItemRowComponent={ItemRowComponent}
      />
    </StyledDialogContent>
  );
});

export default AllAnswerDialogContent;
