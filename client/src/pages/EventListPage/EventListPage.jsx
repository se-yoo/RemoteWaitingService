import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuTitle from '../../components/MenuTitle';
import HelpList from './Sections/HelpList';
import SearchInput from './Sections/SearchInput';

const EventListPage = () => {
  const [title, setTitle] = useState("이벤트 목록");

  useEffect(() => {
    if(false) { // 추후 권한 확인 및 전시
      setTitle("참여 이벤트 목록");
    }
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
          <SearchInput />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventListPage;