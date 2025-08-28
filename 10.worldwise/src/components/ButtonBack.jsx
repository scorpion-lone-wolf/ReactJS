import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ButtonBack = () => {
  const navigate = useNavigate();
  function navigateBack(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <Button type="back" onClick={e => navigateBack(e)}>
      &larr;Back
    </Button>
  );
};

export default ButtonBack;
