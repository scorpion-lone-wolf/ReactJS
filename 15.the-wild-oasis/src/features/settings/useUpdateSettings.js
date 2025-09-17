import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSettingMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting Updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error("Setting failed to Update");
    },
  });
  return { updateSettingMutate, isUpdating };
};

export default useUpdateSettings;
