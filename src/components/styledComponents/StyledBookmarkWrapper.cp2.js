import styled from "styled-components";

export const StyledBookmarkWrapperCp2 = styled.div`
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
/********* ********* ********* ********* ********* ********* ********* ********* *********
    bookmark css 
********* ********* ********* ********* ********* ********* ********* ********* *********/
          &>.ui.grid>.row>.column{
          width: 400px !important; 
          } 
          
            /********* ********* ********* ********* ********* ********* ********* ********* *********
           custom bookmark 
             ********* ********* ********* ********* ********* ********* ********* ********* *********/
         &>.ui.grid>.row>.column > ul.css-wouhos > .css-79elbk > div:first-child {
              display: none !important;
              pointer-events: none;
              color: black !important;
              background-color: unset !important;
              
              &+div{
              margin-top: 10px;
              }
         }  
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
