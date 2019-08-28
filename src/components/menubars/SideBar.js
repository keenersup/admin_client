import React from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import SideBarMenuBar from "./SideBarMenuBar";
import { Link } from "react-router-dom";
import {
  StyledSidebarContentsWrapper,
  StyledSidebarBodyWrapper,
} from "../styledComponents/StyledSidebar";

const SideBar = (props) => {
  const { children, toggleClick, visible, animation, center, full } = props
  return (
    <StyledSidebarBodyWrapper>
      <SideBarMenuBar toggleClick={toggleClick} />
      {  /********* ********* ********* ********* ********* ********* ********* ********* *********
       centeralign here inside of StyledSidebarBodyWrapper after animation
       ********* ********* ********* ********* ********* ********* ********* ********* *********/}
      <StyledSidebarContentsWrapper animation={animation || 'push'} center={center ? "true" : "false"}
                                    full={full ? "true" : "false"}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            icon='labeled'
            animation={animation || 'push'}
            visible={visible}
            vertical
            style={{ borderTop: "none", width: "240px" }}
          >
            <Menu.Item as={Link} to='/'>
              HOME
            </Menu.Item>
            <Menu.Item as={Link} to='/bookmark'>
              <Icon name='bookmark outline' />
              Bookmark
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Billing
            </Menu.Item>
            <Menu.Item as={Link} to='/admin'>
              <Icon name='user' />
              Admin
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </StyledSidebarContentsWrapper>
    </StyledSidebarBodyWrapper>

  )
}
export default SideBar;
