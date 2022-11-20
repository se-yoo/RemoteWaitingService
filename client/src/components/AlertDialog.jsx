import React, { useMemo } from 'react';
import { DialogActions } from '@mui/material';
import CommonDialog from './CommonDialog';
import ActionButtons from './ActionButtons';

const AlertDialog = (props) => {
  const {
    open, 
    onClose, 
    onAgree,
    title, 
    content, 
    hideDisagree,
    disagreeText, 
    agreeText,
    sx
  } = props;

  const buttons = useMemo(() => {
    return [
      (hideDisagree && { text: disagreeText, color: "grey", onClick: onClose }),
      { text: agreeText, onClick: onAgree || onClose }
    ];
  }, [hideDisagree, disagreeText, agreeText, onClose, onAgree]);

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
    <CommonDialog
      open={open}
      sx={sx}
      title={title}
      content={content}
      ActionComponent={ActionComponent}
    />
  );
};

AlertDialog.defaultProps = {
  open: false, 
  onClose: () => {}, 
  title: "제목",
  content: "내용",
  disagreeText: "취소",
  agreeText: "확인",
  hideDisagree: false,
  sx: {}
}

export default AlertDialog;