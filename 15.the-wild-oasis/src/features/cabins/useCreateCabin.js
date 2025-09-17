import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

const useCreateCabin = () => {
  const queryClinet = useQueryClient();

  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  return { createCabinMutate, isCreating };
};

export default useCreateCabin;
