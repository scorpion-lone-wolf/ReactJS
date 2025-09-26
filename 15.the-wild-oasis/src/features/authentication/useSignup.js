import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

function useSignup() {
  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        "Accout Successfully Created! Please verify the new account from the user's email address."
      );
    },
  });
  return { signupMutate, isPending };
}

export default useSignup;
