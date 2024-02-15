import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.credential);
  if (!token) return <Navigate to={"/login"} replace />;
  return children;
};

export default PrivateRoutes;
