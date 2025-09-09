import { Link } from "react-router-dom";
import SearchQuery from "../features/order/SearchQuery";

function Header() {
  return (
    <header>
      <Link to={"/"}>Fast React Pizza Co.</Link>
      <SearchQuery />
      <p>Rahul</p>
    </header>
  );
}

export default Header;
