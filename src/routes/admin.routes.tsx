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
import UpdateStudent from "../pages/admin/usermanagement/updatestudent";
import CreateSemesterRegistration from "../pages/admin/coursemanagement/createsemesterregistration";
import RegisteredSemester from "../pages/admin/coursemanagement/registeredsemester";
import CreateCourse from "../pages/admin/coursemanagement/createcourse";
import Courses from "../pages/admin/coursemanagement/courses";

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
        path: "update-student/:studentId",
        element: <UpdateStudent />,
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
  {
    name: "Course Management",
    children: [
      {
        name: "C. Semester Registration",
        path: "create-semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "List of Registered Semester",
        path: "list-of-registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "list-of-courses",
        element: <Courses />,
      },
      {
        name: "Create Offered Course",
        path: "create-offered-course",
        element: <CreateFaculty />,
      },
    ],
  },
];

export default AdminSegments;
