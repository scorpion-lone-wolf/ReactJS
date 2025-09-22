import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const filter =
    !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };
  const sortBy = { field, direction };

  const page = +searchParams.get("page") || 1; // default page os 1

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { data, isPending, isError, error };
}

export default useBookings;
