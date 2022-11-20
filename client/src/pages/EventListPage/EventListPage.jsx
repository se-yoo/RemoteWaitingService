import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTitle from '../../components/MenuTitle';
import EventList from './Sections/EventList';
import HelpList from './Sections/HelpList';
import SearchInput from './Sections/SearchInput';

const EventListPage = () => {
  const [title, setTitle] = useState("이벤트 목록");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(false) { // 추후 권한 확인 및 전시
      setTitle("참여 이벤트 목록");
    }
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
      <MenuTitle title={title} />
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
    </div>
  );
};

export default EventListPage;