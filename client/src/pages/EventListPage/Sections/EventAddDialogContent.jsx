import React, { useCallback } from 'react';
import { StyledDialogContent } from '../../../components/CommonDialog';
import { Grid, ListItemButton } from '@mui/material';
import styled from '@emotion/styled';

const StyledPresetButton = styled(ListItemButton)({
  background: "#FFFFFF",
  border: "1px solid rgba(73, 111, 70, 0.5)",
  borderRadius: "20px",
  height: "100px",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#496F46",
  width: "100%",
  whiteSpace: "pre-wrap",
  padding: 0,
  justifyContent: "center"
});

const presets = [
  { id: 1, name: '음식점 웨이팅' },
  { id: 2, name: '전시회/\n팝업스토어 예약' },
  { id: 3, name: '공개방송\n참여 신청' },
  { id: 4, name: '사용자 지정' }
]

const EventAddDialogContent = () => {
  const [selectedId, setSelectedId] = React.useState(4);

  const handleListItemClick = useCallback(id => {
    setSelectedId(id);
  });

  return (
    <StyledDialogContent sx={{ mt: 5 }}>
      <Grid
        container
        spacing={3}
      >
        { presets.map(preset => (
          <Grid key={preset.id} item xs={3}>
            <StyledPresetButton
              selected={selectedId === preset.id}
              onClick={() => handleListItemClick(preset.id)}
            >
              {preset.name}
            </StyledPresetButton>
          </Grid>
      )) }
      </Grid>
    </StyledDialogContent>
  );
};

export default EventAddDialogContent;