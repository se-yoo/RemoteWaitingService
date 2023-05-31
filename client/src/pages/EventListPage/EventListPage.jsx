import { Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";
import MenuTitle from "../../components/MenuTitle";
import {
  loadEventList,
  resetEmptyEvent,
} from "../../store/actions/event_actions";
import EventList from "./Sections/EventList";
import HelpList from "./Sections/HelpList";
import SearchInput from "./Sections/SearchInput";
import Auth from "../../hoc/Auth";
import { windowScrollTop } from "../../utils/function";

const EventListPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const loginData = useSelector((state) => state.user.loginData);
  const event = useSelector((state) => state.event);
  const { isAdmin } = loginData || { isAdmin: false };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = useMemo(() => {
    return isAdmin ? "이벤트 목록" : "참여 이벤트 목록";
  }, [isAdmin]);

  useEffect(() => {
    dispatch(loadEventList());
  }, []);

  useEffect(() => {
    if (event.error) {
      const { message, error } = event.error;
      setErrorDialogContent(`${message} \n오류: ${error.toString()}`);
      setOpenAlertError(true);
    }

    return () => {
      dispatch(resetEmptyEvent());
    };
  }, [event.error]);

  const onCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const onChangeSearchKeyword = useCallback((e) => {
    setSearchKeyword(e);
  }, []);

  const onSearch = useCallback(
    (e) => {
      const variable = {
        search: searchKeyword,
      };

      dispatch(loadEventList(variable));
      windowScrollTop();
    },
    [searchKeyword],
  );

  const onClickAddEvent = useCallback(() => {
    navigate("/event/edit/new");
  }, []);

  return (
    <div>
      <MenuTitle title={title} />
      <Grid container justifyContent="space-between" alignItems="end">
        <Grid item xs={4}>
          {isAdmin && (
            <Button
              sx={{
                width: "200px",
                height: "60px",
                fontSize: "24px",
              }}
              onClick={onClickAddEvent}
            >
              이벤트 등록
            </Button>
          )}
        </Grid>
        <Grid item xs={8} sm={6} lg={4}>
          <HelpList />
          <SearchInput
            value={searchKeyword}
            onChangeValue={onChangeSearchKeyword}
            onSearch={onSearch}
          />
        </Grid>
      </Grid>
      <EventList sx={{ mt: 3 }} />
      <AlertDialog
        open={openAlertError}
        onAgree={onCloseErrorDialog}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </div>
  );
};

export default Auth(EventListPage, true);
