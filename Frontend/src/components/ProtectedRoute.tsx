import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props  {
  user: "" | null;
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ user, children }) => {

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;

};

export default ProtectedRoute;