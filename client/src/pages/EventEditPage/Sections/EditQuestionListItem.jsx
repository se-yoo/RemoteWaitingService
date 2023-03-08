import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Grid, ListItem } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SortableHandle } from 'react-sortable-hoc';
import EditQuestionListItemForm from './EditQuestionListItemForm';

const StyledEditQuestionListItem = styled(ListItem)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "24px 16px"
});

const DragHandle = SortableHandle(() => (
  <DragIndicatorIcon sx={{ cursor: "move" }} />
));

const EditQuestionListItem = memo((props) => {
  const { itemIdx } = props;

  return (
    <StyledEditQuestionListItem>
      <Grid
        container
        alignItems="center"
        spacing={2}
      >
        <Grid item xs="auto">
          <DragHandle />
        </Grid>
        <Grid item xs>
          <EditQuestionListItemForm idx={itemIdx} />
        </Grid>
      </Grid>
    </StyledEditQuestionListItem>
  )
});

export default EditQuestionListItem;