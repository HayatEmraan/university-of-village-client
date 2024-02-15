import FacultyDashboard from "../pages/faculty/dashboard";
import OfferedCourse from "../pages/faculty/offeredcourse";

export const FacultySegments = [
  {
    index: true,
    name: "Dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
