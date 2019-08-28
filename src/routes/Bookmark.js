import React from 'react';
import { Grid } from "semantic-ui-react";
import { StyledBookmarkWrapper } from "../components/styledComponents/StyledBookmarkWrapper";

const Bookmark = (props) => {
  return (
    <StyledBookmarkWrapper>
      <Grid columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
           <div style={{ border:"1px solid red"}}/>
          </Grid.Column>
          <Grid.Column>
            <div style={{
              borderLeft: "1px solid blue",
              borderRight: "1px solid blue",
            }}>
              right
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </StyledBookmarkWrapper>
  );
}

export default Bookmark;