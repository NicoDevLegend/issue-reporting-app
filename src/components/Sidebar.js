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
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#212529"
        maxWidth="200px"
        className="h-auto min-vh-100"
        breakpoint={720}
        toggled
      >
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
            {user["https://my-app/roles"][0] === "User" ? (
              <NavLink
                to="/newticket"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activeClicked" : ""
                }
              >
                <CDBSidebarMenuItem icon="clipboard-list">
                  New Ticket
                </CDBSidebarMenuItem>
              </NavLink>
            ) : user["https://my-app/roles"][0] === "Admin" ? (
              <>
              <NavLink
                to="/newticket"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activeClicked" : ""
                }
              >
                <CDBSidebarMenuItem icon="clipboard-list">
                  New Ticket
                </CDBSidebarMenuItem>
              </NavLink>
                <NavLink
                  to="/supportmanagement"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "activeClicked" : ""
                  }
                >
                  <CDBSidebarMenuItem icon="users-cog">
                    Support Management
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  to="/roleassignment"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "activeClicked" : ""
                  }
                >
                  <CDBSidebarMenuItem icon="user-tag">
                    Role Assignment
                  </CDBSidebarMenuItem>
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/checkticket"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activeClicked" : ""
                }
              >
                <CDBSidebarMenuItem icon="clipboard-check">
                  Check Ticket
                </CDBSidebarMenuItem>
              </NavLink>
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter className="text-center">footer</CDBSidebarFooter>
      </CDBSidebar>
    )
  );
}
