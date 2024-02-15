import CreateAcademicSemester from "../pages/admin/academicmanagement/createacademicsemester";
import CreateAdmin from "../pages/admin/usermanagement/createadmin";
import CreateFaculty from "../pages/admin/usermanagement/createfaculty";
import CreateStudent from "../pages/admin/usermanagement/createstudent";
import AdminDashboard from "../pages/admin/dashboard";
import AcademicSemester from "../pages/admin/academicmanagement/academicsemester";
import CreateAcademicDepartment from "../pages/admin/academicmanagement/createacademicdepartment";
import AcademicDepartment from "../pages/admin/academicmanagement/academicdepartment";
import CreateAcademicFaculty from "../pages/admin/academicmanagement/createacademicfaculty";
import AcademicFaculty from "../pages/admin/academicmanagement/academicfaculty";
import ShowStudents from "../pages/admin/usermanagement/showstudents";

const AdminSegments = [
  {
    index: true,
    name: "Dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Semester Management",
    children: [
      {
        name: "C. Academic Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "C. Academic Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "C. Academic Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "List of Student",
        path: "list-of-students",
        element: <ShowStudents />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];

export default AdminSegments;
