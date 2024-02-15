import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/notfound";
import RoutesGenerator from "../utils/generator/routes.generator";
import AdminSegments from "./admin.routes";
import { FacultySegments } from "./faculty.routes";
import { StudentSegments } from "./student.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: RoutesGenerator(AdminSegments),
  },
  {
    path: "/faculty",
    element: <App />,
    children: RoutesGenerator(FacultySegments),
  },
  {
    path: "/student",
    element: <App />,
    children: RoutesGenerator(StudentSegments),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
