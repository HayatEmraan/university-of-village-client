import { NavLink } from "react-router-dom";
import { IAdmin, IAdminRoute } from "../../types";

const SidebarGenerator = (SideSegments: IAdmin[], role: string) => {
  const sidebar = SideSegments.reduce((prev: IAdminRoute[], curr) => {
    if (curr.children) {
      prev.push({
        key: curr.name,
        label: curr.name,
        children: curr.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    } else {
      prev.push({
        key: curr.name,
        label: (
          <NavLink to={`/${role}${curr.path ? `/${curr.path}` : ""}`}>
            {curr.name}
          </NavLink>
        ),
      });
    }
    return prev;
  }, []);

  return sidebar;
};

export default SidebarGenerator;
