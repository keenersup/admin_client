import styled from "styled-components";

export const StyledBookmarkWrapper = styled.div`
          height:100%;
          width: 100%;
          margin: 0 !important;
          padding: 0 !important;
          &>.ui.grid{
          height:100%;
          width: 100%;
          margin: 0 !important;
          padding: 0 !important;
          }
          &>.ui.grid>.row{
          padding-top: 0;
          padding-bottom: 0;
          }
          .ReactVirtualized__Grid__innerScrollContainer{
          overflow: visible !important; 
          }
/********* ********* ********* ********* ********* ********* ********* ********* *********
    bookmark css 
********* ********* ********* ********* ********* ********* ********* ********* *********/
          &>.ui.grid>.row>.column{
          width: 400px !important; 
          } 
          
          & .selected-node{
            & .rstcustom__rowContents{
                color: blue;
            } 
          }
            /********* ********* ********* ********* ********* ********* ********* ********* *********
           rst custom 
             ********* ********* ********* ********* ********* ********* ********* ********* *********/
             & .rstcustom__rowCancelPad::before, & .rstcustom__rowLandingPad::before
{
            background-color: unset; 
            border: unset;
             }
            .rstcustom__rowWrapper:hover {
              background: yellow; 
            } 
            
             & .rst__rowLandingPad::before{
             border-bottom:3px solid lightblue;
             }
             & .rstcustom__rowLandingPad::before{
             border-bottom:3px solid lightblue;
             }
             //& .rstcustom__rowLandingPad::before .rstcustom__rowWrapper{
             //border-bottom:3px solid lightblue;
             //}
             
/********* ********* ********* ********* ********* ********* ********* ********* *********
    right content css 
********* ********* ********* ********* ********* ********* ********* ********* *********/
          &>.ui.grid>.row>.column div{
          overflow-x: visible;
          } 
          &>.ui.grid>.row>.column + .column{
          width: calc( 100% - 400px ) !important;
          } 
          &>.ui.grid>.row>.column + .column >*{
          padding-top: 1rem; 
          } 
          &>.ui.grid>.row>.column>.rst__tree>div>div{
          padding-top: 1rem; 
          }
`
