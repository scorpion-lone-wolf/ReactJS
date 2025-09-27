import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  if (!bookings) return <Spinner />;
  const numBookings = bookings?.length;
  const totalSales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmStays?.length;
  const occupation =
    confirmStays?.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);
  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat title="Check ins" color="indgo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
