import { Box, Button, DialogActions } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CommonDialog from '../../../components/CommonDialog';
import SectionTitle from '../../../components/SectionTitle';
import { EVENT_OPTION } from '../../../utils/code';
import AllAnswerDialogContent from './AllAnswerDialogContent';
import ParticipantInfoTable from './ParticipantInfoTable';
import SettingWinDialogContent from './SettingWinDialogContent';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempEvent = { 
  id: 1, 
  title: '이벤트 제목', 
  description: '이벤트 설명',
  participantCnt: 10, 
  createDate: '2022-09-27', 
  startDate: '2022-09-27 15:00:00',
  endDate: '2022-10-05 18:00:00',
  option: 1
};

const ParticipantInfo = memo(() => {
  const [openDialogAllAnswer, setOpenDialogAllAnswer] = useState(false);
  const [openDialogSettingWin, setOpenDialogSettingWin] = useState(false);
  const { participantCnt, option } = tempEvent;

  const headers = useMemo(() => {
    return [
      { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
      { text: "응답 시간", align: "left", value: 'participantDate' },
      { text: `${option === EVENT_OPTION.WAITING ? '입장' : '당첨'} 여부`, align: "center", value: 'status' }
    ];
  }, [option]);

  const ActionComponent = useMemo(() => {
    return (
      <DialogActions sx={{ px: 0 }}>
        <Button
          color="grey"
          sx={{ width: 160 }}
          variant="contained"
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          variant="contained"
          onClick={onClickSaveWinner}
          sx={{ width: 160, marginLeft: "14px !important" }}
        >
          저장
        </Button>
      </DialogActions>
    )
  });

  const handleClose = useCallback(() => {
    setOpenDialogAllAnswer(false);
    setOpenDialogSettingWin(false);
  }, []);

  const onClickAllAnswer = useCallback(() => {
    setOpenDialogAllAnswer(true);
  }, []);

  const onClickSettingWin = useCallback(() => {
    setOpenDialogSettingWin(true);
  }, []);

  const onClickSaveWinner = useCallback(() => {

  }, []);

  return (
    <>
      <SectionTitle title="참여 정보" sx={{ mt: 6 }} />
      <Box>{participantCnt}명 참여</Box>
      <ParticipantInfoTable headers={headers} />
      <Box
        display="flex"
        justifyContent="end"
        mt={4}
      >
        <Button
          type="translucent"
          customsize="small"
          onClick={onClickAllAnswer}
        >
          전체 답변 상세
        </Button>
        {option !== EVENT_OPTION.WAITING && (
            <Button
              type="translucent"
              customsize="small"
              sx={{ ml: 2 }}
              onClick={onClickSettingWin}
            >
              당첨 설정
            </Button>
        )}
      </Box>
      <CommonDialog
        open={openDialogAllAnswer}
        onClose={handleClose}
        width={1500}
        title="전체 답변 상세"
        closable
        ContentComponent={<AllAnswerDialogContent />}
      />
      <CommonDialog
        open={openDialogSettingWin}
        onClose={handleClose}
        width={900}
        title="당첨 설정"
        subText="참여자 목록에서 당첨 인원을 선정합니다"
        closable
        ContentComponent={<SettingWinDialogContent />}
        ActionComponent={ActionComponent}
      />
    </>
  );
});

export default ParticipantInfo;