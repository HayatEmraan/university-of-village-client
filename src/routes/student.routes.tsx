import OfferedCourse from "../pages/faculty/offeredcourse";
import StudentDashboard from "../pages/student/dashboard";

export const StudentSegments = [
  {
    index: true,
    name: "Dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
