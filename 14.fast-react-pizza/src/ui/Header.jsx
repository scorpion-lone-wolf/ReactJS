import { Link } from "react-router-dom";
import SearchQuery from "../features/order/SearchQuery";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchQuery />
      <UserName />
    </header>
  );
}

export default Header;
