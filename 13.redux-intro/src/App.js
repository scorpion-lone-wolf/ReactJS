import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/components/AccountOperations";
import BalanceDisplay from "./features/accounts/components/BalanceDisplay";
import CreateCustomer from "./features/customers/components/CreateCustomer";
import Customer from "./features/customers/components/Customer";

function App() {
  const customerFullName = useSelector(store => store.customer.fullName);
  console.log(customerFullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerFullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
