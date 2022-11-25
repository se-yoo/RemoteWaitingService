import { Box, Button, DialogActions, TableCell } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ActionButtons from '../../../components/ActionButtons';
import CommonDialog from '../../../components/CommonDialog';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';
import { loadNoticeList, setNotice } from '../../../store/actions/notice_actions';
import { formatDate } from '../../../utils/function';
import NoticeDetailDialogContent from './NoticeDetailDialogContent';
import NoticeEditDialogContent from './NoticeEditDialogContent';

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
  const [page, setPage] = useState(1);
  const [openDialogNotice, setOpenDialogNotice] = useState(false);
  const [openDialogEditNotice, setOpenDialogEditNotice] = useState(false);
  const event = useSelector(state => state.event);
  const notice = useSelector(state => state.notice);
  const { notices, createDate } = notice;
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpenDialogNotice(false);
    setOpenDialogEditNotice(false);
  }, []);
  
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const onClickNotice = useCallback((e, selectedNotice) => {
    dispatch(setNotice(selectedNotice));
    setOpenDialogNotice(true);
  }, []);

  const onClickAddNotice = useCallback(() => {
    setOpenDialogEditNotice(true);
  }, []);

  const onClickDeleteNotice = useCallback(() => {
  }, []);

  const onClickEditNotice = useCallback(() => {
  }, []);

  const detailButtons = useMemo(() => {
    return [
      { text: "삭제", color: "red", onClick: onClickDeleteNotice },
      { text: "수정", onClick: onClickEditNotice }
    ];
  }, [onClickDeleteNotice, onClickEditNotice]);

  const editButtons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: handleClose },
      { text: "등록" }
    ];
  }, [handleClose]);

  const ActionComponent = (buttons) => {
    return (
      <ActionButtons
        WrapComponent={DialogActions}
        sx={{ px: 0 }}
        buttons={buttons}
      />
    );
  };

  useEffect(() => {
    if(id !== event._id) return;
    
    const variable = {
      eventId: id
    };

    dispatch(loadNoticeList(variable));
  }, [event]);

  const ItemCellComponent = {
    createDate: ({item}) => (
      <TableCell align="center">
        {formatDate(item.createDate)}
      </TableCell>
    )
  };

  return (
    <>
      <SectionTitle title="이벤트 공지" sx={{ mt: 6 }} />
      <DataTable
        headers={headers}
        items={notices}
        page={page}
        rowsPerPage={5}
        sx={{ my: 3 }}
        ItemCellComponent={ItemCellComponent}
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
        subText={`생성일 - ${formatDate(createDate)}`}
        closable
        ContentComponent={<NoticeDetailDialogContent />}
        ActionComponent={ActionComponent(detailButtons)}
      />
      <CommonDialog
        open={openDialogEditNotice}
        onClose={handleClose}
        width={900}
        title="공지 "
        subText="이벤트에 대한 공지를 편집합니다"
        closable
        ContentComponent={<NoticeEditDialogContent />}
        ActionComponent={ActionComponent(editButtons)}
      />
    </>
  );
});

export default NoticeInfo;