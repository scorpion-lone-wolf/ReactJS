import Map from "../components/Map";
import Sidebar from "../components/sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import ProtectedRoutes from "./ProtectedRoutes";

const AppLayout = () => {
  return (
    <ProtectedRoutes>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoutes>
  );
};

export default AppLayout;
