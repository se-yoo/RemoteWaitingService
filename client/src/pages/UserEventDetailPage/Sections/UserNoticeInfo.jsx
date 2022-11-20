import React, { memo, useCallback } from 'react';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';

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

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "제목", align: "left", value: 'title' },
  { text: "등록일", align: "center", width: "7%", sx: { minWidth: "10rem" }, value: 'createDate' }
];


const UserNoticeInfo = memo(() => {
  const [page, setPage] = React.useState(1);
  
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
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
      />
    </>
  );
});

export default UserNoticeInfo;