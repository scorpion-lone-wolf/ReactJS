import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to={"/"}>Fast React Pizza Co.</Link>
      <p>Rahul</p>
    </header>
  );
}

export default Header;
