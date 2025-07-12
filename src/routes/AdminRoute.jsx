// AdminRoute.jsx
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../Components/Loading/Loading";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole()

  if (loading || isLoading) return <Loading></Loading>

  if (user && role === "admin") return children;
  return <Navigate to="/" />;
};

export default AdminRoute;
