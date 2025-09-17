import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinMutate, isPending: isDeleting } = useMutation({
    mutationFn: id => deleteCabin(id),
    // eslint-disable-next-line no-unused-vars
    onSuccess: deletedCabin => {
      toast.success("Cabin Successfully deleted");

      // 1. First way to do is to invalidate
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      // 2. Second way to do is to directly updating the cache using setQueryData
      // queryClient.setQueriesData(["cabins"], oldCabinsData => {
      //   console.log("old data before delete", oldCabinsData);
      //   return oldCabinsData
      //     ? oldCabinsData.filter(cabinData => cabinData.id != deletedCabin.id)
      //     : [];
      // });
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  return { deleteCabinMutate, isDeleting };
}
