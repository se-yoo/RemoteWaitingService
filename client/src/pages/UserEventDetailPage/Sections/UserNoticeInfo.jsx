import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';
import { setNotice } from '../../../store/actions/notice_actions';
import CommonDialog from '../../../components/CommonDialog';
import UserNoticeDetailDialogContent from './UserNoticeDetailDialogContent';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempNoticeList = [
  { id: 1, title: '공지사항 제목', createDate: '2022-09-26', description: "공지 내용입니다.", target: 0 },
  { id: 2, title: '공지사항 제목2', createDate: '2022-09-26', description: "공지 내용입니당", target: 0 },
  { id: 3, title: '공지사항 제목3', createDate: '2022-09-26', description: "공지 내용입니ㄷ", target: 0 },
  { id: 4, title: '공지사항 제목4', createDate: '2022-09-26', description: "공지 내용입니다4", target: 0 },
  { id: 5, title: '공지사항 제목5', createDate: '2022-09-26', description: "공지 내용입니다5", target: 0 },
  { id: 6, title: '공지사항 제목6', createDate: '2022-09-26', description: "공지 내용입니다6", target: 0 },
  { id: 7, title: '공지사항 제목7', createDate: '2022-09-26', description: "공지 내용입니다7", target: 0 }
];
// 화면 작업을 위한 임시 값 끝

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "제목", align: "left", value: 'title' },
  { text: "등록일", align: "center", width: "7%", sx: { minWidth: "10rem" }, value: 'createDate' }
];


const UserNoticeInfo = memo(() => {
  const notice = useSelector(state => state.notice);
  const [page, setPage] = React.useState(1);
  const [openDialogNotice, setOpenDialogNotice] = useState(false);
  const dispatch = useDispatch();
  
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);
  
  const handleClose = useCallback(() => {
    setOpenDialogNotice(false);
  }, []);

  const onClickNotice = useCallback((e, selectedNotice) => {
    dispatch(setNotice(selectedNotice));
    setOpenDialogNotice(true);
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
      <CommonDialog
        open={openDialogNotice}
        onClose={handleClose}
        width={900}
        title="공지 상세"
        subText={`생성일 - ${notice.createDate}`}
        closable
        ContentComponent={<UserNoticeDetailDialogContent />}
      />
    </>
  );
});

export default UserNoticeInfo;