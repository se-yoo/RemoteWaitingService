import React, { useCallback, useState } from "react";
import { Checkbox, FormControlLabel, Grid, Button, Box } from "@mui/material";
import UserEventBasicInfo from "../UserEventDetailPage/Sections/UserEventBasicInfo";
import MenuTitle from "../../components/MenuTitle";
import JoinQuestionList from "./Sections/JoinQuestionList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnswer,
  guestCreateAnswer,
} from "../../store/actions/answer_actions";
import Auth from "../../hoc/Auth";
import AlertDialog from "../../components/AlertDialog";

const UserEventJoinPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setisChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const eventId = useParams().eventId;
  const userId = useSelector((state) => state.user.userData);
  const [inputRequired, setInputRequired] = useState([]);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertComplete, setOpenAlertComplete] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const CheckedHandler = () => {
    setisChecked(!isChecked);
  };

  const requiredChecked = () => {
    let requiredResult = null;

    inputRequired.map((item, index) =>
      item
        ? answers[index] === undefined || answers[index] === ""
          ? (requiredResult = false)
          : ""
        : "",
    );

    if (requiredResult == null) requiredResult = true;

    return requiredResult;
  };

  const btnDisabled = () => {
    if (isChecked === true) return false;
    else return true;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (requiredChecked()) {
      let loginUser = userId._id;
      if (loginUser === undefined) {
        loginUser = null;
      }
      let body = {
        answers: answers,
        writer: loginUser,
        event: eventId,
      };

      dispatch(createAnswer(body)).then((response) => {
        if (response.payload.success) {
          if (response.payload.writer !== null) {
            setOpenAlertComplete(true);
          } else {
            let questId = {
              writer: response.payload._id,
            };
            dispatch(guestCreateAnswer(questId)).then((response) => {
              if (response.payload.success) {
                setResultUrl(
                  `/guest/event/detail/${response.payload.eventId}/${response.payload.guestId}`,
                );
                setOpenAlertComplete(true);
              } else {
                setErrorDialogContent(
                  `이벤트 참여에 실패했습니다. \n오류: ${JSON.stringify(
                    response.payload.err,
                  )}`,
                );
                setOpenAlertError(true);
              }
            });
          }
        } else {
          setErrorDialogContent(
            `이벤트 참여에 실패했습니다. \n오류: ${JSON.stringify(
              response.payload.err,
            )}`,
          );
          setOpenAlertError(true);
        }
      });
    } else {
      alert("필수입력값을 입력하세요");
    }
  };

  const handleClose = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const navigateMain = useCallback(() => {
    navigate("/");
  }, []);

  const navigateResult = useCallback(() => {
    navigate(resultUrl);
  }, [resultUrl]);

  return (
    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{
        width: {
          xs: "100%",
          md: "80%",
          xl: "70%",
        },
        margin: {
          xs: "16px",
          sm: "32px",
          md: "32px auto",
          xl: "70px auto",
        },
      }}
    >
      <MenuTitle title={"이벤트 참여"} />
      <UserEventBasicInfo type={"join"} />
      <JoinQuestionList
        value={answers}
        onChangeAnswer={setAnswers}
        required={inputRequired}
        onChangeRequired={setInputRequired}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            sx={{
              color: "#496F46",
              "&.Mui-checked": {
                color: "#496F46",
              },
            }}
          />
        }
        onChange={CheckedHandler}
        label="개인정보 수집 이용에 동의합니다."
      />

      <Grid container justifyContent="end" sx={{ mt: 6 }}>
        <Button
          type="submit"
          disabled={btnDisabled()}
          sx={{ width: 200, ml: 2 }}
        >
          참여
        </Button>
      </Grid>
      <AlertDialog
        open={openAlertComplete}
        onClose={userId && userId._id ? navigateMain : navigateResult}
        title="참여 완료"
        content="이벤트 참여가 완료되었습니다."
        hideDisagree
      />
      <AlertDialog
        open={openAlertError}
        onClose={handleClose}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </Box>
  );
};

export default Auth(UserEventJoinPage, null);
