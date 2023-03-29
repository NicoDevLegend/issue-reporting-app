import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function SideBar() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <CDBSidebar textColor="#fff" backgroundColor="#212529" maxWidth="200px" className="h-auto">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Issue Reporting
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/calendar"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem icon="calendar">Calendar</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/calendar"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem icon="calendar">Calendar</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter className="text-center">
          footer
        </CDBSidebarFooter>
      </CDBSidebar>
    )
  );
}
