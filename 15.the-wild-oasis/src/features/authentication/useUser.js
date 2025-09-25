import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data: user, isPending: isGettingUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  return { user, isGettingUser };
}

export default useUser;
