import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settingData,
    isLoading,
    error: settingError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settingData, isLoading, settingError };
}
