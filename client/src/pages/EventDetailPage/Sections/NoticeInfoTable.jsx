import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';
import { getPageCount, getPageItems, getSeq } from '../../../utils/function';
import NoticeInfoTableRow from './NoticeInfoTableRow';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempNoticeList = [
  { id: 1, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 2, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 3, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 4, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 5, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 6, title: '공지사항 제목', createDate: '2022-09-26' },
  { id: 7, title: '공지사항 제목', createDate: '2022-09-26' }
];
// 화면 작업을 위한 임시 값 끝

const rowsPerPage = 5;

const NoticeInfoTable = memo(() => {
  const [page, setPage] = React.useState(1);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const pageCount = useMemo(() => {
    return getPageCount(tempNoticeList.length, rowsPerPage);
  }, [rowsPerPage]);

  const pageItems = useMemo(() => {
    return getPageItems(page, tempNoticeList, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <>
      <TableContainer component={Box} sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center" 
                sx={{ minWidth: "4rem" }}
                width="7%"
              >
                순서
              </TableCell>
              <TableCell align="left">제목</TableCell>
              <TableCell
                align="center" 
                sx={{ minWidth: "10rem" }}
                width="7%"
              >
                등록일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((item, index) => (
              <NoticeInfoTableRow 
                key={item.id} 
                item={item} 
                index={getSeq(page, rowsPerPage, index)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination 
        count={pageCount} 
        page={page} 
        onChange={handleChangePage}
        sx={{ mt: 5 }}
      />
    </>
  );
});

export default NoticeInfoTable;