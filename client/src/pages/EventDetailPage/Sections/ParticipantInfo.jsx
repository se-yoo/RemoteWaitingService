import { Box, Button, DialogActions } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionButtons from '../../../components/ActionButtons';
import CommonDialog from '../../../components/CommonDialog';
import SectionTitle from '../../../components/SectionTitle';
import { loadEventAnswerList, updateWinner } from '../../../store/actions/answer_actions';
import { EVENT_OPTION } from '../../../utils/code';
import AllAnswerDialogContent from './AllAnswerDialogContent';
import ParticipantInfoTable from './ParticipantInfoTable';
import SettingWinDialogContent from './SettingWinDialogContent';

const ParticipantInfo = memo(() => {
  const [openDialogAllAnswer, setOpenDialogAllAnswer] = useState(false);
  const [openDialogSettingWin, setOpenDialogSettingWin] = useState(false);
  const [selected, setSelected] = useState([]);
  const event = useSelector(state => state.event);
  const { optionCd, participantCnt } = event;
  const dispatch = useDispatch();

  const headers = useMemo(() => {
    return [
      { text: "순서", align: "center", width: "7%", sx: { minWidth: "4rem" }, value: 'index', useIndex: true },
      { text: "응답 시간", align: "left", value: 'participantDate' },
      { text: `${optionCd === EVENT_OPTION.WAITING ? '입장' : '당첨'} 여부`, align: "center", value: 'status' }
    ];
  }, [optionCd]);

  const onClose = useCallback(() => {
    setOpenDialogAllAnswer(false);
    setOpenDialogSettingWin(false);
  }, []);

  const onClickAllAnswer = useCallback(() => {
    setOpenDialogAllAnswer(true);
  }, []);

  const onClickSettingWin = useCallback(() => {
    setSelected([]);
    setOpenDialogSettingWin(true);
  }, []);

  const onClickSaveWinner = useCallback(() => {
    const body = {
      eventId: event._id,
      winners: selected
    };

    dispatch(updateWinner(body))
      .then(res => {
        if (res.payload.success) {
          setOpenDialogSettingWin(false);

          const variable = {
            eventId: event._id,
            optionCd: optionCd
          };

          dispatch(loadEventAnswerList(variable));
        }
      });
  }, [event, selected, optionCd]);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClose },
      { text: "저장", onClick: onClickSaveWinner }
    ];
  }, [onClose, onClickSaveWinner]);

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
        {optionCd !== EVENT_OPTION.WAITING && (
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
        onClose={onClose}
        width={1500}
        title="전체 답변 상세"
        closable
        ContentComponent={<AllAnswerDialogContent />}
      />
      <CommonDialog
        open={openDialogSettingWin}
        onClose={onClose}
        width={900}
        title="당첨 설정"
        subText="참여자 목록에서 당첨 인원을 선정합니다"
        closable
        ContentComponent={
          <SettingWinDialogContent
            selected={selected}
            onChange={setSelected}
          />
        }
        ActionComponent={ActionComponent}
      />
    </>
  );
});

export default ParticipantInfo;