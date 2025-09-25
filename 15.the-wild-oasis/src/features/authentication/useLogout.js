import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["user"],
      });
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutate, isLoggingOut };
}

export default useLogout;
