import React, { useState, useCallback }  from 'react';
import MenuTitle from '../../components/MenuTitle';
import HelpList from './Sections/HelpList';
import SearchInput from '../EventListPage/Sections/SearchInput';
import { Grid } from '@mui/material';
import EventList from './Sections/EventList';
const UserEventListPage = () =>{

  const [searchKeyword, setSearchKeyword] = useState("");
  
  const onChangeSearchKeyword = useCallback((searchKeyword) => {
    setSearchKeyword(searchKeyword);
  }, []);

  const onClickSearch = useCallback(() => {
    // 추후 검색 연결
  }, []);


  return(
    <>
      <MenuTitle title={"참여 이벤트 목록"} />
      <Grid 
        container
        justifyContent="end"
      >
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
      <EventList sx={{ mt: 3 }}/>
    </>
  );
};


export default UserEventListPage;