import { IAdmin } from "../../types";


// react router dom -------------> admin routes
const RoutesGenerator = (PathSegments: IAdmin[]) => {
  const routes = PathSegments.map((paths) => {
    if (paths.index) {
      return {
        index: true,
        element: paths.element,
      };
    } else if (paths.children) {
      return paths.children.map((child) => {
        return {
          path: child.path,
          element: child.element,
        };
      });
    } else {
      return {
        path: paths.path,
        element: paths.element,
      };
    }
  }).flat();

  return routes;
};

export default RoutesGenerator;
