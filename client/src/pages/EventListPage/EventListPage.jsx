import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../components/AlertDialog';
import MenuTitle from '../../components/MenuTitle';
import { loadEventList, resetEmptyEvent } from '../../store/actions/event_actions';
import EventList from './Sections/EventList';
import HelpList from './Sections/HelpList';
import SearchInput from './Sections/SearchInput';

const EventListPage = () => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorDialogContent, setErrorDialogContent] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const event = useSelector(state => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventList());
  }, []);

  useEffect(() => {
    if(event.error) {
      const { message, error } = event.error;
      setErrorDialogContent(`${message} \n오류: ${error.toString()}`);
      setOpenAlertError(true);
    }

    return () => {
      dispatch(resetEmptyEvent());
    }
  }, [event.error]);

  const handleCloseErrorDialog = useCallback(() => {
    setOpenAlertError(false);
  }, []);

  const onChangeSearchKeyword = useCallback((searchKeyword) => {
    setSearchKeyword(searchKeyword);
  }, []);

  const onClickSearch = useCallback(() => {
    // 추후 검색 연결
  }, []);

  const onClickAddEvent = useCallback(() => {
    navigate('/event/edit/new');
  }, []);

  return (
    <div>
      <MenuTitle title="이벤트 목록" />
      <Grid 
        container
        justifyContent="space-between"
        alignItems="end"
      >
        <Grid item xs={4}>
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
        </Grid>
        <Grid 
          item 
          xs={8} 
          sm={6} 
          lg={4}
        >
          <HelpList />
          <SearchInput value={searchKeyword} onChangeValue={onChangeSearchKeyword} onClickSearch={onClickSearch} />
        </Grid>
      </Grid>
      <EventList sx={{ mt: 3 }} />
      <AlertDialog
        open={openAlertError}
        onAgree={handleCloseErrorDialog}
        title="오류 발생"
        content={errorDialogContent}
        hideDisagree
      />
    </div>
  );
};

export default EventListPage;