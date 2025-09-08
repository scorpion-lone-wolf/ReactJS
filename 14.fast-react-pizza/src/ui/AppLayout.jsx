import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);

  return (
    <div className="layout">
      <Header />
      {isLoading ? <Loader /> : <main>{<Outlet />}</main>}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
