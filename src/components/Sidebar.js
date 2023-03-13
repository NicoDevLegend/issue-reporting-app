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
    <CDBSidebar textColor="#fff" backgroundColor="#333">
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
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/profile" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div
          style={{
            padding: "20px 5px",
          }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}
