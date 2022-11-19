import { Box, Button, DialogActions } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonDialog from '../../../components/CommonDialog';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';
import { setNotice } from '../../../store/actions/notice_actions';
import NoticeDetailDialogContent from './NoticeDetailDialogContent';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempNoticeList = [
  { id: 1, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 2, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 3, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 4, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 5, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 6, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 7, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 }
];
// 화면 작업을 위한 임시 값 끝

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "제목", align: "left", value: 'title' },
  { text: "등록일", align: "center", width: "7%", sx: { minWidth: "10rem" }, value: 'createDate' }
];

const NoticeInfo = memo(() => {
  const notice = useSelector(state => state.notice);
  const [page, setPage] = useState(1);
  const [openDialogNotice, setOpenDialogNotice] = useState(false);
  const [openDialogAddNotice, setOpenDialogAddNotice] = useState(false);
  const dispatch = useDispatch();

  const ActionComponent = useMemo(() => {
    return (
      <DialogActions sx={{ px: 0 }}>
        <Button
          color="red"
          sx={{ width: 160 }}
          variant="contained"
          onClick={onClickDeleteNotice}
        >
          삭제
        </Button>
        <Button
          variant="contained"
          onClick={onClickEditNotice}
          sx={{ width: 160, marginLeft: "14px !important" }}
        >
          수정
        </Button>
      </DialogActions>
    )
  });

  const handleClose = useCallback(() => {
    setOpenDialogNotice(false);
    setOpenDialogAddNotice(false);
  }, []);
  
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const onClickNotice = useCallback((e, selectedNotice) => {
    dispatch(setNotice(selectedNotice));
    setOpenDialogNotice(true);
  }, []);

  const onClickAddNotice = useCallback(() => {
    setOpenDialogAddNotice(true);
  }, []);

  const onClickDeleteNotice = useCallback(() => {
  }, []);

  const onClickEditNotice = useCallback(() => {
  }, []);

  return (
    <>
      <SectionTitle title="이벤트 공지" sx={{ mt: 6 }} />
      <DataTable
        headers={headers}
        items={tempNoticeList}
        page={page}
        rowsPerPage={5}
        sx={{ my: 3 }}
        onChangePage={handleChangePage}
        onClickRow={onClickNotice}
      />
      <Box
        display="flex"
        justifyContent="end"
        mt={4}
      >
        <Button
          type="translucent"
          customsize="small"
          onClick={onClickAddNotice}
        >
          공지하기
        </Button>
      </Box>
      <CommonDialog
        open={openDialogNotice}
        onClose={handleClose}
        width={900}
        title="공지 상세"
        subText={`생성일 - ${notice.createDate}`}
        closable
        ContentComponent={<NoticeDetailDialogContent />}
        ActionComponent={ActionComponent}
      />
    </>
  );
});

export default NoticeInfo;