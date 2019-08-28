import React from 'react';
import { Loader } from "semantic-ui-react";
import styled from 'styled-components'
import { bodyHeightWidth } from "../styledComponents/styles";

const StyledAlignCenterWrapper = styled.div`
    display: flex;
    justify-content: center ;
    align-items: center ;
    padding-bottom: 17%;
    
    ${bodyHeightWidth};
`
export const LoadingInline = (props) => {
  return (
    <Loader active inline="centered" />
  )
}
export const LoadingPage = (props) => {
  return (
    <StyledAlignCenterWrapper>
      <Loader inline size="massive" active />
    </StyledAlignCenterWrapper>
  )
}

