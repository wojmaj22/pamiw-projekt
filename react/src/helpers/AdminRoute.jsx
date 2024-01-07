import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  return keycloak.hasRealmRole("admin") ? children : null;
};

export default AdminRoute;
