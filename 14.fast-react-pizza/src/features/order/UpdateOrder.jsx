import { useSubmit } from "react-router-dom";
import Button from "../../ui/Button";

const UpdateOrder = ({ order }) => {
  // we could use useFetcher or Form or fetcher.Form
  const submit = useSubmit();

  return (
    <Button
      type="primary"
      onClick={() => {
        submit(order, { method: "post", encType: "application/json" });
      }}
    >
      Update Priority
    </Button>
  );
};

export default UpdateOrder;
