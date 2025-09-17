import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";

const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCabinMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ updatedCabin, id }) => updateCabin(updatedCabin, id),
    onSuccess: () => {
      toast.success("Cabin Edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
  return { updateCabinMutate, isUpdating };
};

export default useUpdateCabin;
