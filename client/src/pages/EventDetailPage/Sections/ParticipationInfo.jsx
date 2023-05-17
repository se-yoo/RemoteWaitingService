import { Box, Button, DialogActions } from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "../../../components/ActionButtons";
import CommonDialog from "../../../components/CommonDialog";
import SectionTitle from "../../../components/SectionTitle";
import {
  loadEventAnswerList,
  updateAnswer,
  updateWinner,
} from "../../../store/actions/answer_actions";
import { EVENT_OPTION, PARTICIPATION_STATUS } from "../../../utils/code";
import AllAnswerDialogContent from "./AllAnswerDialogContent";
import ParticipationInfoTable from "./ParticipationInfoTable";
import SettingWinDialogContent from "./SettingWinDialogContent";
import AlertDialog from "../../../components/AlertDialog";

const ParticipationInfo = memo(() => {
  const [openDialogAllAnswer, setOpenDialogAllAnswer] = useState(false);
  const [openDialogSettingWin, setOpenDialogSettingWin] = useState(false);
  const [openConfirmStatus, setOpenConfirmStatus] = useState(false);
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [selected, setSelected] = useState([]);
  const [enter, setEnter] = useState({});
  const event = useSelector((state) => state.event);
  const { optionCd, participationCnt } = event;
  const dispatch = useDispatch();

  const headers = useMemo(() => {
    return [
      {
        text: "순서",
        align: "center",
        width: "7%",
        sx: { minWidth: "4rem" },
        value: "index",
        useIndex: true,
      },
      { text: "응답 시간", align: "left", value: "participateDate" },
      {
        text: `${optionCd === EVENT_OPTION.WAITING ? "입장" : "당첨"} 여부`,
        align: "center",
        value: "status",
      },
    ];
  }, [optionCd]);

  const getEventAnswerList = useCallback(() => {
    const variable = {
      eventId: event._id,
      optionCd: optionCd,
    };

    dispatch(loadEventAnswerList(variable));
  }, [event, optionCd]);

  const onClose = useCallback(() => {
    setOpenDialogAllAnswer(false);
    setOpenDialogSettingWin(false);
    setOpenConfirmStatus(false);
    setOpenAlertComplete(false);
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
      winners: selected,
    };

    dispatch(updateWinner(body)).then((res) => {
      if (res.payload.success) {
        getEventAnswerList();
        setOpenDialogSettingWin(false);
      }
    });
  }, [event, selected, optionCd]);

  const onClickEnterStausAgree = useCallback(
    (callback) => {
      dispatch(updateAnswer(enter)).then((res) => {
        if (res.payload.success) {
          getEventAnswerList();
          setOpenConfirmStatus(false);
          setEnter({});
          if (typeof callback === "function") callback();
        }
      });
    },
    [getEventAnswerList, enter],
  );

  const onClickEnterStausDisagree = useCallback(() => {
    setEnter({});
    setOpenConfirmStatus(false);
  }, []);

  const onClickEnterStatus = useCallback((newEnter, prevStatus) => {
    setEnter(newEnter);

    if (prevStatus === PARTICIPATION_STATUS.NONE) {
      // 입장 여부 상태 수정(대기에서 수정)
      setOpenConfirmStatus(true);
    }
  }, []);

  useEffect(() => {
    if (enter._id && !openConfirmStatus) {
      // 입장 여부 상태 수정(완료/취소간 수정)
      onClickEnterStausAgree(() => {
        setOpenAlertComplete(true);
      });
    }
  }, [enter, openConfirmStatus]);

  const buttons = useMemo(() => {
    return [
      { text: "취소", color: "grey", onClick: onClose },
      { text: "저장", onClick: onClickSaveWinner },
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
      <Box>{participationCnt}명 참여</Box>
      <ParticipationInfoTable
        headers={headers}
        onClickEnterStatus={onClickEnterStatus}
      />
      <Box display="flex" justifyContent="end" mt={4}>
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
          <SettingWinDialogContent selected={selected} onChange={setSelected} />
        }
        ActionComponent={ActionComponent}
      />
      <AlertDialog
        open={openConfirmStatus}
        onAgree={onClickEnterStausAgree}
        onClose={onClickEnterStausDisagree}
        title="입장 설정"
        content="정말로 입장 상태를 변경하시겠습니까? 설정 후 대기 상태로 복원할 수 없습니다(완료/취소는 변경 가능)"
      />
      <AlertDialog
        open={openAlertComplete}
        onClose={onClose}
        title="입장 설정"
        content="입장 상태 변경이 완료되었습니다"
        hideDisagree
      />
    </>
  );
});

export default ParticipationInfo;
