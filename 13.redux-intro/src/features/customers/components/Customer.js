import { useSelector } from "react-redux";

function Customer() {
  const customerName = useSelector(store => {
    console.log(store);
    return store.customer.fullName;
  });
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
