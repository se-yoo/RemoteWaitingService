import { Box, Button, DialogActions, TableCell } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ActionButtons from '../../../components/ActionButtons';
import AlertDialog from '../../../components/AlertDialog';
import CommonDialog from '../../../components/CommonDialog';
import DataTable from '../../../components/DataTable';
import SectionTitle from '../../../components/SectionTitle';
import { createNotice, deleteNotice, loadNoticeList, resetEmptyNotice, setNotice, updateNotice } from '../../../store/actions/notice_actions';
import { checkFormValidation, formatDate } from '../../../utils/function';
import { rules } from '../../../utils/resource';
import NoticeDetailDialogContent from './NoticeDetailDialogContent';
import NoticeEditDialogContent from './NoticeEditDialogContent';

const headers = [
  { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
  { text: "제목", align: "left", value: 'title' },
  { text: "등록일", align: "center", width: "7%", sx: { minWidth: "10rem" }, value: 'createDate' }
];

const validation = {
  title: { rules: [rules.required] },
  description: { rules: [rules.required] }
};

const NoticeInfo = memo(() => {
  const [page, setPage] = useState(1);
  const [openDialogNotice, setOpenDialogNotice] = useState(false);
  const [openDialogEditNotice, setOpenDialogEditNotice] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [checkRealTime, setCheckRealTime] = useState(false);
  const [formStatus, setFormStatus] = useState({});
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const event = useSelector(state => state.event);
  const notice = useSelector(state => state.notice);
  const { notices, createDate } = notice;
  const noticeId = notice._id;
  const { id } = useParams();
  const dispatch = useDispatch();

  const isNew = useMemo(() => {
    return noticeId === "new";
  }, [noticeId]);

  const editType = useMemo(() => {
    return isNew ? "등록" : "수정";
  }, [isNew]);

  const handleClose = useCallback(() => {
    setOpenDialogNotice(false);
    setOpenDialogEditNotice(false);
  }, []);

  const handleCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const handleCloseConfirmDialog = useCallback(() => {
    setOpenConfirmDelete(false);
  }, []);
  
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const onClickNotice = useCallback((e, selectedNotice) => {
    dispatch(setNotice(selectedNotice));
    setOpenDialogNotice(true);
  }, []);

  const onClickAddNotice = useCallback(() => {
    dispatch(resetEmptyNotice());
    setCheckRealTime(false);
    setFormStatus({});
    setOpenDialogEditNotice(true);
  }, []);

  const onClickDeleteNotice = useCallback(() => {
    setOpenConfirmDelete(true);
  }, []);

  const onClickEditNotice = useCallback(() => {
    setCheckRealTime(false);
    setFormStatus({});
    setOpenDialogNotice(false);
    setOpenDialogEditNotice(true);
  }, []);

  const getNoticeList = useCallback(() => {    
    const variable = {
      eventId: id
    };

    dispatch(loadNoticeList(variable));
  }, [id]);

  const checkEditFormVaildation = useCallback(() => {
    let check = false;

    for(const key of Object.keys(validation)) {
      const result = checkFormValidation(notice, key, validation[key].rules);

      setFormStatus(prevFormStatus=> {
        let newStatus = {};
        newStatus[key] = result !== true ? result : undefined;

        return {
          ...prevFormStatus,
          ...newStatus
        };
      });

      if(result !== true) {
        check = true;
      }
    }
    
    return check;
  }, [notice]);

  useEffect(() => {
    if(id !== event._id) return;

    getNoticeList();
  }, [event]);

  useEffect(() => {
    if(checkRealTime) {
      checkEditFormVaildation();
    }
  }, [checkRealTime, notice]);

  const editNotice = useCallback(() => {
    const check = checkEditFormVaildation();

    if(check) {
      setCheckRealTime(true);
      return;
    }

    const body = {
      _id: isNew ? undefined : noticeId,
      title: notice.title,
      description: notice.description,
      target: notice.target,
      event: event._id,
    };

    if(isNew) {
      dispatch(createNotice(body))
      .then( res => {
        if(res.payload.success) {
          getNoticeList();
          setOpenDialogEditNotice(false);
        };
      }).catch(err => {
        setErrorDialogContent(`공지 등록에 실패했습니다. \n오류: ${err.toString()}`);
        setOpenAlertError(true);
      });
    } else {
      dispatch(updateNotice(body))
      .then( res => {
        if(res.payload.success) {
          getNoticeList();
          setOpenDialogEditNotice(false);
          setOpenDialogNotice(true);
        };
      }).catch(err => {
        setErrorDialogContent(`공지 수정에 실패했습니다. \n오류: ${err.toString()}`);
        setOpenAlertError(true);
      });
    }
  }, [isNew, notice]);

  const requestDeleteNotice = useCallback(() => {
    const variable = {
      noticeId: noticeId
    };

    dispatch(deleteNotice(variable))
    .then( res => {
      if(res.payload.success) {
        getNoticeList();
        setOpenDialogNotice(false);
        setOpenConfirmDelete(false);
      };
    }).catch(err => {
      setErrorDialogContent(`공지 삭제에 실패했습니다. \n오류: ${err.toString()}`);
      setOpenAlertError(true);
    });
  }, [noticeId]);

  const detailButtons = useMemo(() => {
    return [
      { text: "삭제", color: "red", onClick: onClickDeleteNotice },
      { text: "수정", onClick: onClickEditNotice }
    ];
  }, [onClickDeleteNotice, onClickEditNotice]);

  const editButtons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: handleClose },
      { text: editType, onClick: editNotice }
    ];
  }, [handleClose, editType, editNotice]);

  const ActionComponent = (buttons) => {
    return (
      <ActionButtons
        WrapComponent={DialogActions}
        sx={{ px: 0 }}
        buttons={buttons}
      />
    );
  };

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
        ContentComponent={<NoticeEditDialogContent formStatus={formStatus} />}
        ActionComponent={ActionComponent(editButtons)}
      />
      <AlertDialog
        open={openAlertError}
        onAgree={handleCloseErrorDialog}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />  
      <AlertDialog
        open={openConfirmDelete}
        onClose={handleCloseConfirmDialog}
        onAgree={requestDeleteNotice}
        title="공지 삭제"
        content="정말로 공지를 삭제하시겠습니까? 삭제 후 다시 복구할 수 없습니다."
      />  
    </>
  );
});

export default NoticeInfo;