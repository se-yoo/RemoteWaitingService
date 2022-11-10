import { Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import MenuTitle from '../../components/MenuTitle';
import EventAddDialog from './Sections/EventAddDialog';
import EventList from './Sections/EventList';
import HelpList from './Sections/HelpList';
import SearchInput from './Sections/SearchInput';

const EventListPage = () => {
  const [title, setTitle] = useState("이벤트 목록");
  const [searchKeyword, setSearchKeyword] = useState("");

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

  return (
    <div>
      <MenuTitle title={title} />
      <Grid 
        container
        justifyContent="space-between"
        alignItems="end"
      >
        <Grid item xs={4}>
          <EventAddDialog />
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