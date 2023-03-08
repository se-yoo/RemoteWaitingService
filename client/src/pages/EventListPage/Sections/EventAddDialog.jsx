import React, { useCallback, useMemo, useState } from 'react';
import { Button, DialogActions } from '@mui/material';
import CommonDialog from '../../../components/CommonDialog';
import EventAddDialogContent from './EventAddDialogContent';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../../../components/ActionButtons';

const EventAddDialog = () => {
  const [selectedId, setSelectedId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleListItemClick = useCallback(id => {
    setSelectedId(id);
  });

  const onClickAddEvent = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const onClickSelected = useCallback(() => {
    navigate('/event/edit/new', { state: { preset: selectedId }})
  }, []);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: handleClose },
      { text: "선택", onClick: onClickSelected }
    ];
  }, [handleClose, onClickSelected]);

  const ActionComponent = useMemo(() => {
    return (
      <ActionButtons
        WrapComponent={DialogActions}
        sx={{ px: 0 }}
        buttons={buttons}
      />
    );
  }, [buttons]);

  return (
    <>
      <Button
        sx={{
          width: "200px",
          height: "60px",
          fontSize: "24px"
        }}
        onClick={onClickAddEvent}
      >
        이벤트 등록
      </Button>
      <CommonDialog
        open={openDialog}
        onClose={handleClose}
        width={900}
        title="이벤트 등록"
        subText="새로 생성할 이벤트 참여 양식의 템플릿을 선택합니다"
        closable
        ContentComponent={
          <EventAddDialogContent 
            selectedId={selectedId}
            onSelected={handleListItemClick} 
          />
        }
        ActionComponent={ActionComponent}
      />
    </>
  );
};

export default EventAddDialog;