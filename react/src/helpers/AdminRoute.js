import { useKeycloak } from "@react-keycloak/web";

const AdminRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  return keycloak.hasRealmRole("admin") ? children : null;
};

export default AdminRoute;
