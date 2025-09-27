import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User Account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { updateUserMutate, isUpdating };
};

export default useUpdateUser;
