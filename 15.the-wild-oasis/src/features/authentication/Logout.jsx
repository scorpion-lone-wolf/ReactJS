import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogout from "./useLogout";

function Logout() {
  const { logoutMutate, isLoggingOut } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logoutMutate}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
