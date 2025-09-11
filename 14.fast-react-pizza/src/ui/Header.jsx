import { Link } from "react-router-dom";
import SearchQuery from "../features/order/SearchQuery";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-400 bg-yellow-400 px-4 py-3 align-middle uppercase sm:px-6">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchQuery />
      <UserName />
    </header>
  );
}

export default Header;
