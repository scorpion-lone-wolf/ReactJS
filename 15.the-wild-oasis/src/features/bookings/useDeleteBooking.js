import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteBooking } from "../../services/apiBookings";
function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBookingData, isPending: isDeleting } = useMutation({
    mutationFn: bookingId => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking  successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Unable to delete the Booking");
    },
  });
  return { deleteBookingData, isDeleting };
}

export default useDeleteBooking;
