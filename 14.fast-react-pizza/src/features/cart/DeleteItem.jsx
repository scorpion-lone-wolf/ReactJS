import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  function handlePizzaDelete() {
    dispatch(removeItem(pizzaId));
  }
  return (
    <Button type="small" onClick={handlePizzaDelete}>
      Delete
    </Button>
  );
};

export default DeleteItem;
