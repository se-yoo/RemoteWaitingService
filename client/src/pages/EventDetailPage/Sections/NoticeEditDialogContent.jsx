import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDialogContent } from '../../../components/CommonDialog';
import SectionTitle from '../../../components/SectionTitle';
import { setNoticeDescription, setNoticeTarget, setNoticeTitle } from '../../../store/actions/notice_actions';
import { NOTICE_TARGET_TEXT } from '../../../utils/code';

const NoticeEditDialogContent = memo(() => {
  const title = useSelector(state => state.notice.title);
  const description = useSelector(state => state.notice.description);
  const target = useSelector(state => state.notice.target);
  const dispatch = useDispatch();

  const onChangeTitle = useCallback((e) => {
    dispatch(setNoticeTitle(e.target.value));
  }, []);

  const onChangeDesc = useCallback((e) => {
    dispatch(setNoticeDescription(e.target.value));
  }, []);

  const onChangeTarget = useCallback((e) => {
    dispatch(setNoticeTarget(e.target.value));
  }, []);

  return (
    <StyledDialogContent>
      <SectionTitle title="공지 제목" sx={{ mt: 4 }} />
      <TextField
        value={title}
        onChange={onChangeTitle}
        fullWidth
        placeholder="공지 제목"
      />
      <SectionTitle title="공지 내용" sx={{ mt: 6 }} />
      <TextField
        value={description}
        onChange={onChangeDesc}
        multiline
        rows={5}
        placeholder="공지 내용을 작성해주세요"
      />
      <SectionTitle title="공지 대상" sx={{ mt: 6 }} />
      <FormControl fullWidth>
        <Select
          value={target}
          onChange={onChangeTarget}
          sx={{ maxWidth: 370 }}
        >
          {NOTICE_TARGET_TEXT.map(noticeTarget => (
            <MenuItem key={noticeTarget.value} value={noticeTarget.value}>
              {noticeTarget.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledDialogContent>
  );
});

export default NoticeEditDialogContent;