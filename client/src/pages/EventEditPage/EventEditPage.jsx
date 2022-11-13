import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import MenuTitle from '../../components/MenuTitle';
import EditDesc from './Sections/EditDesc';
import EditQuestions from './Sections/EditQuestions';
import EditTitle from './Sections/EditTitle';

const EventEditPage = () => {
  const [title, setTitle] = useState("제목없는 이벤트");
  const [description, setDescription] = useState("");

  return (
    <div>
      <MenuTitle 
        title={"이벤트 등록"} 
        subText={"이벤트 참여 양식을 생성합니다"}
      />
      <EditTitle
        value={title} 
        onChangeValue={setTitle}
        sx={{ mt: 8 }}
      />
      <EditDesc
        value={description} 
        onChangeValue={setDescription}
        sx={{ mt: 4 }}
      />
      <EditQuestions
        sx={{ mt: 4 }}
      />
      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button color="grey" sx={{ width: 160 }}>
          취소
        </Button>
        <Button sx={{ width: 200, ml: 2 }}>
          등록
        </Button>
      </Grid>
    </div>
  );
};

export default EventEditPage;