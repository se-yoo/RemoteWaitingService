import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';
import { setNotice } from '../../../store/actions/notice_actions';
import CommonDialog from '../../../components/CommonDialog';
import UserNoticeDetailDialogContent from './UserNoticeDetailDialogContent';
import { useParams } from 'react-router-dom';
import { loadUserNoticeList } from '../../../store/actions/notice_actions';

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "제목", align: "left", value: 'title' },
  { text: "등록일", align: "center", width: "7%", sx: { minWidth: "10rem" }, value: 'createDate' }
];


const UserNoticeInfo = memo((props) => {
  const {noticeTarget} = props;
  const notice = useSelector(state => state.notice);
  const [page, setPage] = React.useState(1);
  const [openDialogNotice, setOpenDialogNotice] = useState(false);
  const dispatch = useDispatch();
  const [noticeList, setNoticeList] = useState([]);
  const eventId = useParams().eventId;

  const body={
    target:noticeTarget,
    eventId:eventId
  }

  useEffect(()=>{
    dispatch(loadUserNoticeList(body))
    .then(response=>{
      if(response.payload.success){
        setNoticeList(response.payload.noticeList);
        //console.log(JSON.stringify(response.payload.noticeList));
      }
      else{
        console.log(response.payload.err);
      }
    })
  }, [dispatch])
  
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
        items={noticeList}
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