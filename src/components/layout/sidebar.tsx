import { Layout, Menu } from "antd";
import SidebarGenerator from "../../utils/generator/sidebar.generator";
import AdminSegments from "../../routes/admin.routes";
import { Navigate } from "react-router-dom";
import { FacultySegments } from "../../routes/faculty.routes";
import { StudentSegments } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";

const { Sider } = Layout;

const ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const role = useAppSelector((state) => state.credential.user?.role);
  let items;

  switch (role) {
    case ROLE.ADMIN:
      items = SidebarGenerator(AdminSegments, ROLE.ADMIN);
      break;
    case ROLE.FACULTY:
      items = SidebarGenerator(FacultySegments, ROLE.FACULTY);
      break;
    case ROLE.STUDENT:
      items = SidebarGenerator(StudentSegments, ROLE.STUDENT);
      break;
    default:
      <Navigate to={"/"} replace />;
      break;
  }

  return (
    <Sider
      style={{ position: "sticky", height: "100vh", left: 0, top: 0 }}
      breakpoint="lg"
      collapsedWidth="0">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "32px",
          margin: 16,
        }}>
        <h1 style={{ textAlign: "center", color: "white" }}>UOV</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
