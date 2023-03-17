import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

export default function SideBar() {

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#212529">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
          href="/"
          className="text-decoration-none"
          style={{ color: "inherit" }}
        >
          Sidebar
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
            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter className="text-center">
        <div className="px-20 py-5">Sidebar Footer</div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}
